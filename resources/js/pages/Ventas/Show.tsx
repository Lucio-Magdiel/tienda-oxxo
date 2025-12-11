import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';




interface User {
  name: string;
  email: string;
}


interface Producto {
  id: number;
  nombre: string;
  codigo: string;
  categoria: {
    nombre: string;
  };
}

interface DetalleVenta {
  id: number;
  cantidad: number;
  precio_unitario: string;
  subtotal: string;
  producto: Producto;
}

interface Venta {
  id: number;
  folio: string;
  total: string;
  metodo_pago: string;
  created_at: string;
  user: User;
  detalles: DetalleVenta[];
}

interface Props {
  venta: Venta;
}

export default function Show({ venta }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Ventas',
      href: '/ventas',
    },
    {
      title: venta.folio,
      href: `/ventas/${venta.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Venta ${venta.folio}`}>
        <style>{`
          @media print {
            /* Ocultar todo excepto el ticket */
            body * {
              visibility: hidden;
            }
            
            #ticket-print, #ticket-print * {
              visibility: visible;
            }
            
            #ticket-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 80mm;
              padding: 5mm;
              font-size: 10pt;
            }
            
            /* Ocultar sidebar y navegación */
            nav, header, aside, .sidebar, button, .no-print {
              display: none !important;
            }
            
            /* Ticket compacto */
            table {
              width: 100%;
              font-size: 9pt;
            }
            
            th, td {
              padding: 2px 0 !important;
              border: none !important;
            }
            
            /* Remover sombras y bordes */
            * {
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            
            /* Página tamaño ticket */
            @page {
              size: 80mm auto;
              margin: 0;
            }
            
            html, body {
              width: 80mm;
              margin: 0;
              padding: 0;
            }
          }
        `}</style>
      </Head>

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="no-print mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Detalle de Venta</h2>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Imprimir Ticket
              </button>
              <Link
                href="/ventas"
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Volver
              </Link>
            </div>
          </div>

          {/* Vista para pantalla */}
          <div className="no-print overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              {/* Información general */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600">Folio</p>
                  <p className="text-lg font-semibold">{venta.folio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="text-lg font-semibold">
                    {new Date(venta.created_at).toLocaleString('es-MX')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cajero</p>
                  <p className="text-lg font-semibold">{venta.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Método de Pago</p>
                  <p className="text-lg font-semibold capitalize">
                    {venta.metodo_pago}
                  </p>
                </div>
              </div>

              {/* Detalles de productos */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold">Productos</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Código
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Categoría
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          Cantidad
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          P. Unitario
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {venta.detalles.map((detalle) => (
                        <tr key={detalle.id}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            {detalle.producto.codigo}
                          </td>
                          <td className="px-6 py-4">
                            {detalle.producto.nombre}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            {detalle.producto.categoria.nombre}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right">
                            {detalle.cantidad}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right">
                            ${detalle.precio_unitario}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                            ${detalle.subtotal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end border-t-2 border-gray-200 pt-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${venta.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket optimizado para impresión térmica (80mm) */}
      <div id="ticket-print" className="hidden print:block">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>TIENDA OXXO</h2>
          <p style={{ fontSize: '11px', margin: '2px 0' }}>Ticket de Venta</p>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>#{venta.id}</p>
        </div>
        
        <div style={{ borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '8px 0', marginBottom: '8px' }}>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>
            Fecha: {new Date(venta.created_at).toLocaleDateString('es-MX')}
          </p>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>
            Hora: {new Date(venta.created_at).toLocaleTimeString('es-MX')}
          </p>
          <p style={{ fontSize: '10px', margin: '2px 0' }}>
            Cajero: {venta.user.name}
          </p>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #000' }}>
                <th style={{ textAlign: 'left', padding: '4px 0' }}>Producto</th>
                <th style={{ textAlign: 'center', padding: '4px 0' }}>Cant</th>
                <th style={{ textAlign: 'right', padding: '4px 0' }}>Precio</th>
                <th style={{ textAlign: 'right', padding: '4px 0' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {venta.detalles.map((detalle) => (
                <tr key={detalle.id}>
                  <td style={{ padding: '4px 0', fontSize: '9px' }}>
                    {detalle.producto.nombre}
                  </td>
                  <td style={{ textAlign: 'center', padding: '4px 0' }}>
                    {detalle.cantidad}
                  </td>
                  <td style={{ textAlign: 'right', padding: '4px 0' }}>
                    ${detalle.precio_unitario}
                  </td>
                  <td style={{ textAlign: 'right', padding: '4px 0', fontWeight: 'bold' }}>
                    ${detalle.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ borderTop: '1px dashed #000', paddingTop: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold' }}>
            <span>TOTAL:</span>
            <span>${venta.total}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '9px', marginTop: '12px' }}>
          <p style={{ margin: '2px 0' }}>¡Gracias por su compra!</p>
          <p style={{ margin: '2px 0' }}>Vuelva pronto</p>
        </div>
      </div>
    </AppLayout>
  );
}
