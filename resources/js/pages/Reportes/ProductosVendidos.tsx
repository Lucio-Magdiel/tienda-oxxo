import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reportes' },
  { title: 'Productos Vendidos', href: '/reportes/productos-vendidos' },
];

interface Producto {
  producto: {
    nombre: string;
    codigo: string;
    categoria: {
      nombre: string;
    };
  };
  total_vendido: number;
  total_ingresos: string;
}

interface Props {
  productos?: Producto[];
  filtros?: {
    fecha_inicio: string;
    fecha_fin: string;
  };
}

export default function ProductosVendidos({ productos, filtros }: Props) {
  const { data, setData, get, processing } = useForm({
    fecha_inicio: filtros?.fecha_inicio || '',
    fecha_fin: filtros?.fecha_fin || '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    get('/reportes/productos-vendidos');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Productos Más Vendidos">
        <style>{`
          @media print {
            @page {
              size: A4 portrait;
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
            <h2 className="text-2xl font-bold">Productos Más Vendidos</h2>
          </div>

          {/* Formulario de filtros */}
          <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg no-print">
            <div className="p-6">
              <form onSubmit={submit} className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    value={data.fecha_inicio}
                    onChange={(e) => setData('fecha_inicio', e.target.value)}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={data.fecha_fin}
                    onChange={(e) => setData('fecha_fin', e.target.value)}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    Generar Reporte
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tabla de productos */}
          {productos && (
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          #
                        </th>
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
                          Unidades Vendidas
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          Ingresos Totales
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {productos.map((item, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            {item.producto.codigo}
                          </td>
                          <td className="px-6 py-4">{item.producto.nombre}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            {item.producto.categoria.nombre}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right font-semibold">
                            {item.total_vendido}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-green-600">
                            ${item.total_ingresos}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {productos.length === 0 && (
                  <p className="mt-4 text-center text-gray-500">
                    No se encontraron productos vendidos en el periodo
                    seleccionado
                  </p>
                )}

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
          )}
        </div>
      </div>

      {/* Reporte optimizado para impresión */}
      {productos && (
        <div id="report-print">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '20pt', fontWeight: 'bold', margin: '0 0 10px 0' }}>
              TIENDA OXXO
            </h1>
            <h2 style={{ fontSize: '16pt', margin: '0 0 5px 0' }}>
              Productos Más Vendidos
            </h2>
            {filtros && (
              <p style={{ fontSize: '10pt', margin: '0' }}>
                Periodo: {new Date(filtros.fecha_inicio).toLocaleDateString('es-MX')} - {new Date(filtros.fecha_fin).toLocaleDateString('es-MX')}
              </p>
            )}
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #000' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #000' }}>#</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #000' }}>Código</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #000' }}>Producto</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #000' }}>Categoría</th>
                <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #000' }}>Unidades</th>
                <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #000' }}>Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>{index + 1}</td>
                  <td style={{ padding: '8px' }}>{item.producto.codigo}</td>
                  <td style={{ padding: '8px' }}>{item.producto.nombre}</td>
                  <td style={{ padding: '8px' }}>{item.producto.categoria.nombre}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{item.total_vendido}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>${item.total_ingresos}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '9pt', color: '#666' }}>
            <p>Generado el {new Date().toLocaleString('es-MX')}</p>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
