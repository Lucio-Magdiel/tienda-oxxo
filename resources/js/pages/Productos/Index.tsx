import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Productos', href: '/productos' },
];

interface Categoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: string;
  stock: number;
  categoria: Categoria;
}

interface Props {
  productos: {
    data: Producto[];
    links: any[];
    current_page: number;
    last_page: number;
  };
  categorias: Categoria[];
  filters: {
    search?: string;
    categoria_id?: number;
  };
}

export default function Index({ productos, categorias, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [categoriaId, setCategoriaId] = useState(filters.categoria_id || '');

  const handleSearch = () => {
    router.get('/productos', { search, categoria_id: categoriaId }, { preserveState: true });
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      router.delete(`/productos/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Productos" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Productos</h2>
                <Link
                  href="/productos/create"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Nuevo Producto
                </Link>
              </div>

              <div className="mb-4 grid gap-4 md:grid-cols-3">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSearch}
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Buscar
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {productos.data.map((producto) => (
                      <tr key={producto.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {producto.codigo}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {producto.nombre}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {producto.categoria.nombre}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          ${producto.precio}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`rounded px-2 py-1 text-xs ${
                              producto.stock <= 10
                                ? 'bg-red-100 text-red-800'
                                : producto.stock <= 50
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {producto.stock}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <Link
                            href={`/productos/${producto.id}/edit`}
                            className="mr-2 text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(producto.id)}
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

              {productos.data.length === 0 && (
                <p className="mt-4 text-center text-gray-500">
                  No se encontraron productos
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
