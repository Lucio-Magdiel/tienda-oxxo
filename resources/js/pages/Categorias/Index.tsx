import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Categorías', href: '/categorias' },
];

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
  productos_count: number;
  created_at: string;
}

interface Props {
  categorias: Categoria[];
}

export default function Index({ categorias }: Props) {
  const [search, setSearch] = useState('');

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      router.delete(`/categorias/${id}`);
    }
  };

  const filteredCategorias = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categorías" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Categorías</h2>
                <Link
                  href="/categorias/create"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Nueva Categoría
                </Link>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar categoría..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Productos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredCategorias.map((categoria) => (
                      <tr key={categoria.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          {categoria.nombre}
                        </td>
                        <td className="px-6 py-4">{categoria.descripcion}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {categoria.productos_count}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <Link
                            href={`/categorias/${categoria.id}/edit`}
                            className="mr-2 text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(categoria.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCategorias.length === 0 && (
                <p className="mt-4 text-center text-gray-500">
                  No se encontraron categorías
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
