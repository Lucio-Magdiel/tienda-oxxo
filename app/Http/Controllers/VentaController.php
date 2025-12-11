<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Venta;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Venta::with(['user', 'detalles.producto']);

        if ($request->has('fecha_inicio') && $request->has('fecha_fin')) {
            $query->whereBetween('created_at', [
                $request->fecha_inicio . ' 00:00:00',
                $request->fecha_fin . ' 23:59:59'
            ]);
        }

        $ventas = $query->latest()->paginate(10);

        return Inertia::render('Ventas/Index', [
            'ventas' => $ventas,
            'filters' => $request->only(['fecha_inicio', 'fecha_fin'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productos = Producto::with('categoria')
            ->where('stock', '>', 0)
            ->get();

        return Inertia::render('Ventas/Create', [
            'productos' => $productos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'metodo_pago' => 'required|in:efectivo,tarjeta',
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            // Generar folio único
            $folio = 'V-' . date('Ymd') . '-' . str_pad(Venta::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT);

            // Crear la venta
            $venta = Venta::create([
                'user_id' => auth()->id(),
                'folio' => $folio,
                'total' => 0,
                'metodo_pago' => $validated['metodo_pago'],
            ]);

            $total = 0;

            // Crear detalles de venta
            foreach ($validated['productos'] as $item) {
                $producto = Producto::findOrFail($item['id']);

                // Verificar stock
                if ($producto->stock < $item['cantidad']) {
                    throw new \Exception("Stock insuficiente para {$producto->nombre}");
                }

                $subtotal = $producto->precio * $item['cantidad'];
                $total += $subtotal;

                // Crear detalle
                DetalleVenta::create([
                    'venta_id' => $venta->id,
                    'producto_id' => $producto->id,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                    'subtotal' => $subtotal,
                ]);

                // Actualizar stock
                $producto->decrement('stock', $item['cantidad']);
            }

            // Actualizar total de venta
            $venta->update(['total' => $total]);

            DB::commit();

            return redirect()->route('ventas.show', $venta)
                ->with('success', 'Venta registrada exitosamente.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Venta $venta)
    {
        $venta->load(['user', 'detalles.producto.categoria']);

        return Inertia::render('Ventas/Show', [
            'venta' => $venta
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Las ventas no se editan, solo se consultan
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Las ventas no se actualizan
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Venta $venta)
    {
        // Cancelar venta (restaurar stock)
        DB::beginTransaction();

        try {
            foreach ($venta->detalles as $detalle) {
                $detalle->producto->increment('stock', $detalle->cantidad);
            }

            $venta->delete();

            DB::commit();

            return redirect()->route('ventas.index')
                ->with('success', 'Venta cancelada exitosamente.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
