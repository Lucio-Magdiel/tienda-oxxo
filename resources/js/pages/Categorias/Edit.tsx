import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
}

interface Props {
  categoria: Categoria;
}

export default function Edit({ categoria }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categorías', href: '/categorias' },
    { title: 'Editar Categoría', href: `/categorias/${categoria.id}/edit` },
  ];

  const { data, setData, put, processing, errors } = useForm({
    nombre: categoria.nombre,
    descripcion: categoria.descripcion || '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/categorias/${categoria.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Categoría" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Editar Categoría</h2>
                <Link
                  href="/categorias"
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Volver
                </Link>
              </div>

              <form onSubmit={submit}>
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
                    rows={4}
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.descripcion && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.descripcion}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    Actualizar
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
