<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rutas de Productos - Acceso para todos (cajeros y admin)
    Route::get('productos', [\App\Http\Controllers\ProductoController::class, 'index'])->name('productos.index');
    Route::get('productos/{producto}', [\App\Http\Controllers\ProductoController::class, 'show'])->name('productos.show');

    // Rutas de Ventas - Acceso para todos (cajeros y admin)
    Route::resource('ventas', \App\Http\Controllers\VentaController::class);

    // Rutas solo para ADMINISTRADORES
    Route::middleware(['admin'])->group(function () {
        // Categorías - Solo admin
        Route::resource('categorias', \App\Http\Controllers\CategoriaController::class);

        // Productos - CRUD completo solo para admin
        Route::get('productos/create', [\App\Http\Controllers\ProductoController::class, 'create'])->name('productos.create');
        Route::post('productos', [\App\Http\Controllers\ProductoController::class, 'store'])->name('productos.store');
        Route::get('productos/{producto}/edit', [\App\Http\Controllers\ProductoController::class, 'edit'])->name('productos.edit');
        Route::put('productos/{producto}', [\App\Http\Controllers\ProductoController::class, 'update'])->name('productos.update');
        Route::delete('productos/{producto}', [\App\Http\Controllers\ProductoController::class, 'destroy'])->name('productos.destroy');

        // Reportes - Solo admin
        Route::get('reportes', [\App\Http\Controllers\ReporteController::class, 'index'])->name('reportes.index');
        Route::get('reportes/ventas', [\App\Http\Controllers\ReporteController::class, 'ventas'])->name('reportes.ventas');
        Route::get('reportes/productos-vendidos', [\App\Http\Controllers\ReporteController::class, 'productosVendidos'])->name('reportes.productos-vendidos');
        Route::get('reportes/inventario', [\App\Http\Controllers\ReporteController::class, 'inventario'])->name('reportes.inventario');
    });
});

require __DIR__.'/settings.php';
