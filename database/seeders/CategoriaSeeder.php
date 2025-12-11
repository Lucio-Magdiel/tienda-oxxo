<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            [
                'nombre' => 'Bebidas',
                'descripcion' => 'Bebidas refrescantes, jugos, aguas y bebidas energéticas',
            ],
            [
                'nombre' => 'Snacks',
                'descripcion' => 'Botanas, papas fritas, dulces y chocolates',
            ],
            [
                'nombre' => 'Lácteos',
                'descripcion' => 'Leche, yogurt, quesos y productos lácteos',
            ],
            [
                'nombre' => 'Abarrotes',
                'descripcion' => 'Productos de despensa básicos',
            ],
            [
                'nombre' => 'Panadería',
                'descripcion' => 'Pan dulce, pan blanco y productos de panadería',
            ],
            [
                'nombre' => 'Higiene Personal',
                'descripcion' => 'Productos de cuidado personal e higiene',
            ],
            [
                'nombre' => 'Limpieza',
                'descripcion' => 'Productos de limpieza para el hogar',
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
