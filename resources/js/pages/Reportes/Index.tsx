import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Reportes', href: '/reportes' },
];

export default function Index() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Reportes del Sistema</h2>
            <p className="text-gray-600">
              Selecciona el tipo de reporte que deseas generar
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Reporte de Ventas */}
            <Link
              href="/reportes/ventas"
              className="block transform overflow-hidden rounded-lg bg-white shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Reporte de Ventas</h3>
                <p className="text-gray-600">
                  Visualiza ventas por periodo, método de pago y totales
                </p>
              </div>
            </Link>

            {/* Reporte de Productos Vendidos */}
            <Link
              href="/reportes/productos-vendidos"
              className="block transform overflow-hidden rounded-lg bg-white shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Productos Más Vendidos
                </h3>
                <p className="text-gray-600">
                  Ranking de productos por cantidad vendida e ingresos
                </p>
              </div>
            </Link>

            {/* Reporte de Inventario */}
            <Link
              href="/reportes/inventario"
              className="block transform overflow-hidden rounded-lg bg-white shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Reporte de Inventario
                </h3>
                <p className="text-gray-600">
                  Estado actual del inventario y productos con stock bajo
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
