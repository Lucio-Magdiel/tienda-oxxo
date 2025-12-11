<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productos = [
            // Bebidas
            ['categoria_id' => 1, 'codigo' => 'BEB001', 'nombre' => 'Coca Cola 600ml', 'descripcion' => 'Refresco Coca Cola 600ml', 'precio' => 18.50, 'stock' => 100],
            ['categoria_id' => 1, 'codigo' => 'BEB002', 'nombre' => 'Pepsi 600ml', 'descripcion' => 'Refresco Pepsi 600ml', 'precio' => 17.00, 'stock' => 80],
            ['categoria_id' => 1, 'codigo' => 'BEB003', 'nombre' => 'Agua Ciel 1L', 'descripcion' => 'Agua natural embotellada', 'precio' => 12.00, 'stock' => 150],
            ['categoria_id' => 1, 'codigo' => 'BEB004', 'nombre' => 'Jugo Jumex 1L', 'descripcion' => 'Jugo de frutas variadas', 'precio' => 22.00, 'stock' => 60],
            ['categoria_id' => 1, 'codigo' => 'BEB005', 'nombre' => 'Red Bull 250ml', 'descripcion' => 'Bebida energética', 'precio' => 35.00, 'stock' => 45],

            // Snacks
            ['categoria_id' => 2, 'codigo' => 'SNK001', 'nombre' => 'Sabritas Clásicas', 'descripcion' => 'Papas fritas 45g', 'precio' => 16.00, 'stock' => 120],
            ['categoria_id' => 2, 'codigo' => 'SNK002', 'nombre' => 'Doritos Nacho', 'descripcion' => 'Totopos sabor nacho 65g', 'precio' => 18.00, 'stock' => 90],
            ['categoria_id' => 2, 'codigo' => 'SNK003', 'nombre' => 'Cheetos Poffs', 'descripcion' => 'Botana de maíz inflado 45g', 'precio' => 16.50, 'stock' => 85],
            ['categoria_id' => 2, 'codigo' => 'SNK004', 'nombre' => 'Carlos V', 'descripcion' => 'Chocolate con cacahuate', 'precio' => 14.00, 'stock' => 100],
            ['categoria_id' => 2, 'codigo' => 'SNK005', 'nombre' => 'Kranky', 'descripcion' => 'Chocolate con nuez', 'precio' => 12.00, 'stock' => 95],

            // Lácteos
            ['categoria_id' => 3, 'codigo' => 'LAC001', 'nombre' => 'Leche Lala 1L', 'descripcion' => 'Leche entera pasteurizada', 'precio' => 24.00, 'stock' => 70],
            ['categoria_id' => 3, 'codigo' => 'LAC002', 'nombre' => 'Yogurt Danone', 'descripcion' => 'Yogurt natural 125g', 'precio' => 11.00, 'stock' => 60],
            ['categoria_id' => 3, 'codigo' => 'LAC003', 'nombre' => 'Queso Philadelphia', 'descripcion' => 'Queso crema 190g', 'precio' => 52.00, 'stock' => 35],

            // Abarrotes
            ['categoria_id' => 4, 'codigo' => 'ABA001', 'nombre' => 'Sopa Maruchan', 'descripcion' => 'Sopa instantánea sabor pollo', 'precio' => 9.50, 'stock' => 150],
            ['categoria_id' => 4, 'codigo' => 'ABA002', 'nombre' => 'Atún Dolores', 'descripcion' => 'Atún en agua lata 140g', 'precio' => 18.50, 'stock' => 80],
            ['categoria_id' => 4, 'codigo' => 'ABA003', 'nombre' => 'Frijoles La Costeña', 'descripcion' => 'Frijoles refritos lata 430g', 'precio' => 22.00, 'stock' => 65],

            // Panadería
            ['categoria_id' => 5, 'codigo' => 'PAN001', 'nombre' => 'Gansito', 'descripcion' => 'Panque con crema y mermelada', 'precio' => 11.00, 'stock' => 110],
            ['categoria_id' => 5, 'codigo' => 'PAN002', 'nombre' => 'Pingüinos', 'descripcion' => 'Panque de chocolate', 'precio' => 10.50, 'stock' => 105],
            ['categoria_id' => 5, 'codigo' => 'PAN003', 'nombre' => 'Donas Bimbo', 'descripcion' => 'Donas glaseadas paquete', 'precio' => 28.00, 'stock' => 55],

            // Higiene Personal
            ['categoria_id' => 6, 'codigo' => 'HIG001', 'nombre' => 'Shampoo Sedal 340ml', 'descripcion' => 'Shampoo para cabello', 'precio' => 45.00, 'stock' => 40],
            ['categoria_id' => 6, 'codigo' => 'HIG002', 'nombre' => 'Jabón Zest', 'descripcion' => 'Jabón de tocador', 'precio' => 12.00, 'stock' => 75],
            ['categoria_id' => 6, 'codigo' => 'HIG003', 'nombre' => 'Pasta Colgate', 'descripcion' => 'Pasta dental 75ml', 'precio' => 32.00, 'stock' => 50],

            // Limpieza
            ['categoria_id' => 7, 'codigo' => 'LIM001', 'nombre' => 'Cloro Cloralex 1L', 'descripcion' => 'Blanqueador con cloro', 'precio' => 28.00, 'stock' => 45],
            ['categoria_id' => 7, 'codigo' => 'LIM002', 'nombre' => 'Fabuloso 1L', 'descripcion' => 'Limpiador multiusos', 'precio' => 32.00, 'stock' => 50],
            ['categoria_id' => 7, 'codigo' => 'LIM003', 'nombre' => 'Jabón Roma', 'descripcion' => 'Jabón para lavar ropa', 'precio' => 15.00, 'stock' => 70],
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}
