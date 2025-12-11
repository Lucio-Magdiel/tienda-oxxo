<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReporteController extends Controller
{
    public function index()
    {
        return Inertia::render('Reportes/Index');
    }

    public function ventas(Request $request)
    {
        // Si no hay fechas, mostrar solo el formulario
        if (!$request->has('fecha_inicio') || !$request->has('fecha_fin')) {
            return Inertia::render('Reportes/Ventas', [
                'ventas' => null,
                'resumen' => null,
                'filtros' => null
            ]);
        }

        $request->validate([
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        $ventas = Venta::with(['user', 'detalles.producto'])
            ->whereBetween('created_at', [
                $request->fecha_inicio . ' 00:00:00',
                $request->fecha_fin . ' 23:59:59'
            ])
            ->get();

        $resumen = [
            'total_ventas' => $ventas->count(),
            'total_ingresos' => $ventas->sum('total'),
            'promedio_venta' => $ventas->avg('total'),
            'ventas_efectivo' => $ventas->where('metodo_pago', 'efectivo')->sum('total'),
            'ventas_tarjeta' => $ventas->where('metodo_pago', 'tarjeta')->sum('total'),
        ];

        return Inertia::render('Reportes/Ventas', [
            'ventas' => $ventas,
            'resumen' => $resumen,
            'filtros' => $request->only(['fecha_inicio', 'fecha_fin'])
        ]);
    }

    public function productosVendidos(Request $request)
    {
        // Si no hay fechas, mostrar solo el formulario
        if (!$request->has('fecha_inicio') || !$request->has('fecha_fin')) {
            return Inertia::render('Reportes/ProductosVendidos', [
                'productos' => null,
                'filtros' => null
            ]);
        }

        $request->validate([
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
        ]);

        $productos = DetalleVenta::select(
                'producto_id',
                DB::raw('SUM(cantidad) as total_vendido'),
                DB::raw('SUM(subtotal) as total_ingresos')
            )
            ->with('producto.categoria')
            ->whereHas('venta', function ($query) use ($request) {
                $query->whereBetween('created_at', [
                    $request->fecha_inicio . ' 00:00:00',
                    $request->fecha_fin . ' 23:59:59'
                ]);
            })
            ->groupBy('producto_id')
            ->orderByDesc('total_vendido')
            ->get();

        return Inertia::render('Reportes/ProductosVendidos', [
            'productos' => $productos,
            'filtros' => $request->only(['fecha_inicio', 'fecha_fin'])
        ]);
    }

    public function inventario()
    {
        $productos = Producto::with('categoria')
            ->select('productos.*')
            ->get()
            ->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'codigo' => $producto->codigo,
                    'nombre' => $producto->nombre,
                    'categoria' => $producto->categoria->nombre,
                    'precio' => $producto->precio,
                    'stock' => $producto->stock,
                    'valor_inventario' => $producto->precio * $producto->stock,
                    'estado' => $producto->stock <= 10 ? 'Bajo' : ($producto->stock <= 50 ? 'Medio' : 'Alto'),
                ];
            });

        $resumen = [
            'total_productos' => $productos->count(),
            'valor_total_inventario' => $productos->sum('valor_inventario'),
            'productos_bajo_stock' => $productos->where('stock', '<=', 10)->count(),
        ];

        return Inertia::render('Reportes/Inventario', [
            'productos' => $productos,
            'resumen' => $resumen
        ]);
    }
}
