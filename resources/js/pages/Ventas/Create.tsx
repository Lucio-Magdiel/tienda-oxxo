import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';



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
  productos: Producto[];
}

interface ProductoVenta {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function Create({ productos }: Props) {
  const breadcrumbs = [
    { title: 'Ventas', href: '/ventas' },
    { title: 'Nueva Venta', href: '/ventas/create' },
  ];

  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState<ProductoVenta[]>([]);

  const { data, setData, post, processing, errors } = useForm({
    metodo_pago: 'efectivo',
    productos: [] as { id: number; cantidad: number }[],
  });

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto: Producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: parseFloat(producto.precio),
          cantidad: 1,
        },
      ]);
    }
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito(
      carrito.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const productosData = carrito.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
    }));
    data.productos = productosData;
    post('/ventas');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Nueva Venta" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nueva Venta</h2>
            <Link
              href="/ventas"
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Volver
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Panel de productos */}
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Productos</h3>

                <input
                  type="text"
                  placeholder="Buscar producto por nombre o código..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />

                <div className="max-h-[500px] space-y-2 overflow-y-auto">
                  {productosFiltrados.map((producto) => (
                    <div
                      key={producto.id}
                      className="flex items-center justify-between rounded border border-gray-200 p-3 hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-gray-600">
                          {producto.codigo} - {producto.categoria.nombre}
                        </p>
                        <p className="text-sm">
                          ${producto.precio} - Stock: {producto.stock}
                        </p>
                      </div>
                      <button
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={producto.stock === 0}
                        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:bg-gray-300"
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Carrito de compras */}
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Carrito</h3>

                {carrito.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No hay productos en el carrito
                  </p>
                ) : (
                  <>
                    <div className="mb-4 max-h-[300px] space-y-2 overflow-y-auto">
                      {carrito.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded border border-gray-200 p-3"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{item.nombre}</p>
                            <p className="text-sm text-gray-600">
                              ${item.precio} x {item.cantidad} = $
                              {(item.precio * item.cantidad).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={item.cantidad}
                              onChange={(e) =>
                                actualizarCantidad(
                                  item.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              min="1"
                              className="w-16 rounded border border-gray-300 px-2 py-1 text-center"
                            />
                            <button
                              onClick={() => eliminarDelCarrito(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4 rounded border-t-2 border-gray-200 pt-4">
                      <div className="mb-2 flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span>${calcularTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <form onSubmit={submit}>
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Método de Pago
                        </label>
                        <select
                          value={data.metodo_pago}
                          onChange={(e) => setData('metodo_pago', e.target.value)}
                          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                          required
                        >
                          <option value="efectivo">Efectivo</option>
                          <option value="tarjeta">Tarjeta</option>
                        </select>
                      </div>

                      {errors.productos && (
                        <p className="mb-2 text-sm text-red-600">
                          {errors.productos}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={processing || carrito.length === 0}
                        className="w-full rounded bg-green-500 px-6 py-3 text-white hover:bg-green-600 disabled:bg-gray-300"
                      >
                        Procesar Venta
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
