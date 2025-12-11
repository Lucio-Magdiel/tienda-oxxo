import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reportes' },
  { title: 'Inventario', href: '/reportes/inventario' },
];

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: string;
  stock: number;
  valor_inventario: number;
  estado: string;
}

interface Resumen {
  total_productos: number;
  valor_total_inventario: number;
  productos_bajo_stock: number;
}

interface Props {
  productos: Producto[];
  resumen: Resumen;
}

export default function Inventario({ productos, resumen }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reporte de Inventario">
        <style>{`
          @media print {
            @page {
              size: A4 landscape;
              margin: 1cm;
            }
            body {
              font-size: 10pt;
            }
            .no-print {
              display: none !important;
            }
            #report-print {
              display: block !important;
            }
            table {
              page-break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
          }
          #report-print {
            display: none;
          }
        `}</style>
      </Head>

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4 no-print">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Reporte de Inventario</h2>
          </div>

          {/* Resumen */}
          <div className="mb-6 grid gap-6 md:grid-cols-3 no-print">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-sm text-gray-600">Total de Productos</p>
              <p className="text-3xl font-bold text-blue-600">
                {resumen.total_productos}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-sm text-gray-600">Valor Total Inventario</p>
              <p className="text-3xl font-bold text-green-600">
                ${resumen.valor_total_inventario.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-sm text-gray-600">Productos Bajo Stock</p>
              <p className="text-3xl font-bold text-red-600">
                {resumen.productos_bajo_stock}
              </p>
            </div>
          </div>

          {/* Tabla de inventario */}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
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
                        Precio
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {producto.codigo}
                        </td>
                        <td className="px-6 py-4">{producto.nombre}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {producto.categoria}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          ${producto.precio}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-semibold">
                          {producto.stock}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-green-600">
                          ${producto.valor_inventario.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`rounded px-2 py-1 text-xs ${
                              producto.estado === 'Bajo'
                                ? 'bg-red-100 text-red-800'
                                : producto.estado === 'Medio'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {producto.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center no-print">
                <button
                  onClick={() => window.print()}
                  className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
                >
                  Imprimir Reporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reporte optimizado para impresión (landscape) */}
      <div id="report-print">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20pt', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            TIENDA OXXO
          </h1>
          <h2 style={{ fontSize: '16pt', margin: '0 0 5px 0' }}>
            Reporte de Inventario
          </h2>
        </div>

        <div style={{ marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
          <table style={{ width: '100%', fontSize: '11pt' }}>
            <tbody>
              <tr>
                <td style={{ padding: '5px', fontWeight: 'bold' }}>Total de Productos:</td>
                <td style={{ padding: '5px', textAlign: 'right' }}>{resumen.total_productos}</td>
                <td style={{ padding: '5px', fontWeight: 'bold' }}>Valor Total Inventario:</td>
                <td style={{ padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>${resumen.valor_total_inventario.toFixed(2)}</td>
                <td style={{ padding: '5px', fontWeight: 'bold' }}>Productos Bajo Stock:</td>
                <td style={{ padding: '5px', textAlign: 'right', color: '#dc2626', fontWeight: 'bold' }}>{resumen.productos_bajo_stock}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #000' }}>
              <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Código</th>
              <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Producto</th>
              <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Categoría</th>
              <th style={{ padding: '6px', textAlign: 'right', borderBottom: '1px solid #000' }}>Precio</th>
              <th style={{ padding: '6px', textAlign: 'right', borderBottom: '1px solid #000' }}>Stock</th>
              <th style={{ padding: '6px', textAlign: 'right', borderBottom: '1px solid #000' }}>Valor</th>
              <th style={{ padding: '6px', textAlign: 'center', borderBottom: '1px solid #000' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '6px' }}>{producto.codigo}</td>
                <td style={{ padding: '6px' }}>{producto.nombre}</td>
                <td style={{ padding: '6px' }}>{producto.categoria}</td>
                <td style={{ padding: '6px', textAlign: 'right' }}>${producto.precio}</td>
                <td style={{ padding: '6px', textAlign: 'right', fontWeight: 'bold' }}>{producto.stock}</td>
                <td style={{ padding: '6px', textAlign: 'right', fontWeight: 'bold' }}>${producto.valor_inventario.toFixed(2)}</td>
                <td style={{ 
                  padding: '6px', 
                  textAlign: 'center', 
                  fontWeight: 'bold',
                  color: producto.estado === 'Bajo' ? '#dc2626' : producto.estado === 'Medio' ? '#ca8a04' : '#16a34a'
                }}>
                  {producto.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '9pt', color: '#666' }}>
          <p>Generado el {new Date().toLocaleString('es-MX')}</p>
        </div>
      </div>
    </AppLayout>
  );
}
