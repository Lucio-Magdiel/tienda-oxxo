import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ventas',
    href: '/ventas',
  },
];

interface User {
  name: string;
}

interface Venta {
  id: number;
  folio: string;
  total: string;
  metodo_pago: string;
  created_at: string;
  user: User;
}

interface Props {
  ventas: {
    data: Venta[];
    links: any[];
    current_page: number;
    last_page: number;
  };
  filters: {
    fecha_inicio?: string;
    fecha_fin?: string;
  };
}

export default function Index({ ventas, filters }: Props) {
  const [fechaInicio, setFechaInicio] = useState(filters.fecha_inicio || '');
  const [fechaFin, setFechaFin] = useState(filters.fecha_fin || '');

  const handleFilter = () => {
    router.get(
      '/ventas',
      { fecha_inicio: fechaInicio, fecha_fin: fechaFin },
      { preserveState: true }
    );
  };

  const handleDelete = (id: number) => {
    if (
      confirm('¿Estás seguro de cancelar esta venta? Se restaurará el inventario.')
    ) {
      router.delete(`/ventas/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ventas" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Ventas</h2>
                <Link
                  href="/ventas/create"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Nueva Venta
                </Link>
              </div>

              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Fecha inicio"
                />
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Fecha fin"
                />
                <button
                  onClick={handleFilter}
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Filtrar
                </button>
              </div>

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
                        Método de Pago
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {ventas.data.map((venta) => (
                      <tr key={venta.id}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {venta.folio}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {new Date(venta.created_at).toLocaleString('es-MX')}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {venta.user.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm capitalize">
                          {venta.metodo_pago}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-green-600">
                          ${venta.total}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <Link
                            href={`/ventas/${venta.id}`}
                            className="mr-2 text-blue-600 hover:text-blue-900"
                          >
                            Ver
                          </Link>
                          <button
                            onClick={() => handleDelete(venta.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {ventas.data.length === 0 && (
                <p className="mt-4 text-center text-gray-500">
                  No se encontraron ventas
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
