import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Tienda OXXO" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Sistema de Tienda OXXO</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Bienvenido, {auth?.user?.name} - {isAdmin ? 'Administrador' : 'Cajero'}
                    </p>
                </div>

                {/* Accesos rápidos - Prioridad a Vender */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href="/ventas/create"
                        className="transform rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg transition hover:scale-105"
                    >
                        <div className="mb-2 text-4xl">💵</div>
                        <h3 className="text-xl font-semibold">Nueva Venta</h3>
                        <p className="text-sm opacity-90">Realizar venta (POS)</p>
                    </Link>

                    <Link
                        href="/ventas"
                        className="transform rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg transition hover:scale-105"
                    >
                        <div className="mb-2 text-4xl">💰</div>
                        <h3 className="text-xl font-semibold">Historial Ventas</h3>
                        <p className="text-sm opacity-90">Ver ventas registradas</p>
                    </Link>

                    <Link
                        href="/productos"
                        className="transform rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg transition hover:scale-105"
                    >
                        <div className="mb-2 text-4xl">🛒</div>
                        <h3 className="text-xl font-semibold">Productos</h3>
                        <p className="text-sm opacity-90">Ver inventario</p>
                    </Link>

                    {isAdmin && (
                        <>
                            <Link
                                href="/categorias"
                                className="transform rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white shadow-lg transition hover:scale-105"
                            >
                                <div className="mb-2 text-4xl">📦</div>
                                <h3 className="text-xl font-semibold">Categorías</h3>
                                <p className="text-sm opacity-90">Gestionar categorías</p>
                            </Link>

                            <Link
                                href="/reportes"
                                className="transform rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg transition hover:scale-105"
                            >
                                <div className="mb-2 text-4xl">📊</div>
                                <h3 className="text-xl font-semibold">Reportes</h3>
                                <p className="text-sm opacity-90">Análisis y estadísticas</p>
                            </Link>
                        </>
                    )}
                </div>

                {/* Características del sistema */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                        <h4 className="mb-2 text-lg font-semibold">💸 Punto de Venta</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Sistema POS intuitivo para registrar ventas rápidamente
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                        <h4 className="mb-2 text-lg font-semibold">📦 Control de Inventario</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Actualización automática de stock con cada venta
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                        <h4 className="mb-2 text-lg font-semibold">🔐 Sistema de Roles</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Permisos diferenciados para administradores y cajeros
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
