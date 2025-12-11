import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Categoria {
  id: number;
  nombre: string;
}

interface Props {
  categorias: Categoria[];
}

export default function Create({ categorias }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/productos' },
    { title: 'Nuevo Producto', href: '/productos/create' },
  ];

  const { data, setData, post, processing, errors } = useForm({
    categoria_id: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: null as File | null,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/productos');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Nuevo Producto" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Nuevo Producto</h2>
                <Link
                  href="/productos"
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Volver
                </Link>
              </div>

              <form onSubmit={submit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Categoría *
                    </label>
                    <select
                      value={data.categoria_id}
                      onChange={(e) => setData('categoria_id', e.target.value)}
                      className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.categoria_id && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.categoria_id}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Código *
                    </label>
                    <input
                      type="text"
                      value={data.codigo}
                      onChange={(e) => setData('codigo', e.target.value)}
                      className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                      required
                    />
                    {errors.codigo && (
                      <p className="mt-1 text-sm text-red-600">{errors.codigo}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={data.descripcion}
                    onChange={(e) => setData('descripcion', e.target.value)}
                    rows={3}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Precio *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.precio}
                      onChange={(e) => setData('precio', e.target.value)}
                      className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                      required
                    />
                    {errors.precio && (
                      <p className="mt-1 text-sm text-red-600">{errors.precio}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Stock (Cantidad) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={data.stock}
                      onChange={(e) => setData('stock', e.target.value)}
                      className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                      required
                      placeholder="Ingrese la cantidad"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Imagen
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setData('imagen', e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full"
                  />
                  {errors.imagen && (
                    <p className="mt-1 text-sm text-red-600">{errors.imagen}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
