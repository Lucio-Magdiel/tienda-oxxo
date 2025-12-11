<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear usuarios
        User::firstOrCreate(
            ['email' => 'admin@tienda-oxxo.com'],
            [
                'name' => 'Administrador',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'role' => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'cajero@tienda-oxxo.com'],
            [
                'name' => 'Cajero 1',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'role' => 'cajero',
            ]
        );

        // Ejecutar seeders
        $this->call([
            CategoriaSeeder::class,
            ProductoSeeder::class,
        ]);
    }
}
