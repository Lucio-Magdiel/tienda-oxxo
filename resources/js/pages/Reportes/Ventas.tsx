import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reportes' },
  { title: 'Ventas', href: '/reportes/ventas' },
];

interface Venta {
  id: number;
  folio: string;
  total: string;
  metodo_pago: string;
  created_at: string;
  user: {
    name: string;
  };
}

interface Resumen {
  total_ventas: number;
  total_ingresos: string;
  promedio_venta: string;
  ventas_efectivo: string;
  ventas_tarjeta: string;
}

interface Props {
  ventas?: Venta[];
  resumen?: Resumen;
  filtros?: {
    fecha_inicio: string;
    fecha_fin: string;
  };
}

export default function Ventas({ ventas, resumen, filtros }: Props) {
  const { data, setData, get, processing } = useForm({
    fecha_inicio: filtros?.fecha_inicio || '',
    fecha_fin: filtros?.fecha_fin || '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    get('/reportes/ventas');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reporte de Ventas">
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
            <h2 className="text-2xl font-bold">Reporte de Ventas</h2>
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

          {/* Resumen */}
          {resumen && (
            <>
              <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <p className="text-sm text-gray-600">Total de Ventas</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {resumen.total_ventas}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <p className="text-sm text-gray-600">Ingresos Totales</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${resumen.total_ingresos}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <p className="text-sm text-gray-600">Ventas Efectivo</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${resumen.ventas_efectivo}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <p className="text-sm text-gray-600">Ventas Tarjeta</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${resumen.ventas_tarjeta}
                  </p>
                </div>
              </div>

              {/* Tabla de ventas */}
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Detalle de Ventas
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Folio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Cajero
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Método
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {ventas?.map((venta) => (
                          <tr key={venta.id}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {venta.folio}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                              {new Date(venta.created_at).toLocaleString(
                                'es-MX'
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                              {venta.user.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm capitalize">
                              {venta.metodo_pago}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-semibold">
                              ${venta.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {ventas && ventas.length === 0 && (
                    <p className="mt-4 text-center text-gray-500">
                      No se encontraron ventas en el periodo seleccionado
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
            </>
          )}
        </div>
      </div>

      {/* Reporte optimizado para impresión */}
      {resumen && (
        <div id="report-print">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '20pt', fontWeight: 'bold', margin: '0 0 10px 0' }}>
              TIENDA OXXO
            </h1>
            <h2 style={{ fontSize: '16pt', margin: '0 0 5px 0' }}>
              Reporte de Ventas
            </h2>
            {filtros && (
              <p style={{ fontSize: '10pt', margin: '0' }}>
                Periodo: {new Date(filtros.fecha_inicio).toLocaleDateString('es-MX')} - {new Date(filtros.fecha_fin).toLocaleDateString('es-MX')}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
            <table style={{ width: '100%', fontSize: '11pt' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px', fontWeight: 'bold' }}>Total de Ventas:</td>
                  <td style={{ padding: '5px', textAlign: 'right' }}>{resumen.total_ventas}</td>
                  <td style={{ padding: '5px', fontWeight: 'bold' }}>Ingresos Totales:</td>
                  <td style={{ padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>${resumen.total_ingresos}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', fontWeight: 'bold' }}>Ventas Efectivo:</td>
                  <td style={{ padding: '5px', textAlign: 'right' }}>${resumen.ventas_efectivo}</td>
                  <td style={{ padding: '5px', fontWeight: 'bold' }}>Ventas Tarjeta:</td>
                  <td style={{ padding: '5px', textAlign: 'right' }}>${resumen.ventas_tarjeta}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '12pt', fontWeight: 'bold', marginBottom: '10px' }}>
            Detalle de Ventas
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #000' }}>
                <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Folio</th>
                <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Fecha</th>
                <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Cajero</th>
                <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #000' }}>Método</th>
                <th style={{ padding: '6px', textAlign: 'right', borderBottom: '1px solid #000' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas?.map((venta, index) => (
                <tr key={venta.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '6px' }}>{venta.folio}</td>
                  <td style={{ padding: '6px' }}>
                    {new Date(venta.created_at).toLocaleString('es-MX')}
                  </td>
                  <td style={{ padding: '6px' }}>{venta.user.name}</td>
                  <td style={{ padding: '6px', textTransform: 'capitalize' }}>{venta.metodo_pago}</td>
                  <td style={{ padding: '6px', textAlign: 'right', fontWeight: 'bold' }}>${venta.total}</td>
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
