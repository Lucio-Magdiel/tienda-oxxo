# Comandos Útiles - Sistema Tienda OXXO

## 🚀 Comandos de Inicio

### Iniciar el servidor de desarrollo
```bash
cd c:\xampp\htdocs\tienda-oxxo
php artisan serve
```
URL: http://localhost:8000

### Iniciar con puerto personalizado
```bash
php artisan serve --port=8080
```

### Iniciar accesible desde la red local
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

---

## 📦 Comandos de Base de Datos

### Ejecutar migraciones (crear tablas)
```bash
php artisan migrate
```

### Ejecutar migraciones y seeders (con datos de ejemplo)
```bash
php artisan migrate --seed
```

### Resetear base de datos completa
```bash
php artisan migrate:fresh --seed
```

### Solo ejecutar seeders
```bash
php artisan db:seed
```

### Ejecutar un seeder específico
```bash
php artisan db:seed --class=CategoriaSeeder
php artisan db:seed --class=ProductoSeeder
```

---

## 🗄️ Comandos de Consulta

### Ver todas las rutas
```bash
php artisan route:list
```

### Ver rutas específicas
```bash
php artisan route:list --path=productos
php artisan route:list --path=ventas
```

### Ver modelos
```bash
php artisan model:show Producto
php artisan model:show Venta
```

---

## 🧹 Comandos de Limpieza

### Limpiar todas las cachés
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Limpiar todo de una vez
```bash
php artisan optimize:clear
```

### Generar cachés optimizadas (producción)
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 🔧 Comandos de Desarrollo

### Crear nuevo modelo con migración
```bash
php artisan make:model NombreModelo -m
```

### Crear nuevo controlador
```bash
php artisan make:controller NombreController
```

### Crear controlador con recursos (CRUD)
```bash
php artisan make:controller NombreController --resource
```

### Crear nuevo seeder
```bash
php artisan make:seeder NombreSeeder
```

### Crear migración
```bash
php artisan make:migration create_nombre_table
```

---

## 📁 Comandos de Storage

### Crear enlace simbólico para storage público
```bash
php artisan storage:link
```

### Ver información del enlace
```bash
php artisan storage:link --help
```

---

## 👥 Comandos de Usuario

### Crear nuevo usuario (Tinker)
```bash
php artisan tinker
```
Luego ejecuta:
```php
User::create([
    'name' => 'Nuevo Usuario',
    'email' => 'usuario@example.com',
    'password' => bcrypt('password'),
    'email_verified_at' => now()
]);
```

### Listar usuarios existentes (Tinker)
```bash
php artisan tinker
```
```php
User::all();
```

---

## 🔍 Comandos de Inspección

### Ver configuración de la aplicación
```bash
php artisan about
```

### Ver información del entorno
```bash
php artisan env
```

### Verificar estado de la base de datos
```bash
php artisan db:show
```

### Ver tablas de la base de datos
```bash
php artisan db:table users
php artisan db:table productos
```

---

## 📊 Consultas SQL Directas

### Conectar a SQLite (si tienes sqlite3 instalado)
```bash
sqlite3 database/database.sqlite
```

### Consultas útiles en SQLite
```sql
-- Ver todas las categorías
SELECT * FROM categorias;

-- Ver todos los productos con su categoría
SELECT p.codigo, p.nombre, p.precio, p.stock, c.nombre as categoria 
FROM productos p 
JOIN categorias c ON p.categoria_id = c.id;

-- Ver todas las ventas
SELECT * FROM ventas ORDER BY created_at DESC;

-- Ver productos con stock bajo
SELECT codigo, nombre, stock FROM productos WHERE stock <= 10;

-- Salir de SQLite
.quit
```

---

## 🎨 Comandos de Frontend

### Instalar dependencias
```bash
npm install
```

### Modo desarrollo (con hot reload)
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```

### Verificar errores de TypeScript
```bash
npm run type-check
```

### Formatear código
```bash
npm run format
```

---

## 🧪 Comandos de Testing (si se configuran tests)

### Ejecutar todos los tests
```bash
php artisan test
```

### Ejecutar test específico
```bash
php artisan test --filter NombreDelTest
```

### Tests con Pest
```bash
vendor/bin/pest
```

---

## 🔐 Comandos de Seguridad

### Generar nueva APP_KEY
```bash
php artisan key:generate
```

### Verificar vulnerabilidades en dependencias
```bash
composer audit
npm audit
```

---

## 📝 Comandos de Logs

### Ver últimos logs
```bash
# Windows
type storage\logs\laravel.log

# O abre el archivo en un editor
notepad storage\logs\laravel.log
```

### Limpiar logs
```bash
# Windows
del storage\logs\laravel.log
echo. > storage\logs\laravel.log
```

---

## 🌐 URLs Importantes

| Página | URL |
|--------|-----|
| Inicio | http://localhost:8000 |
| Login | http://localhost:8000/login |
| Dashboard | http://localhost:8000/dashboard |
| Categorías | http://localhost:8000/categorias |
| Productos | http://localhost:8000/productos |
| Ventas | http://localhost:8000/ventas |
| Reportes | http://localhost:8000/reportes |

---

## ⚡ Comandos Rápidos Combinados

### Reset completo del proyecto
```bash
php artisan migrate:fresh --seed
php artisan storage:link
php artisan optimize:clear
npm run build
php artisan serve
```

### Setup inicial desde cero
```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
npm run build
php artisan serve
```

---

## 🐛 Comandos de Debugging

### Modo debug activado
Edita `.env`:
```env
APP_DEBUG=true
```

### Ver queries SQL ejecutadas (en código)
```php
DB::enableQueryLog();
// Tu código aquí
dd(DB::getQueryLog());
```

### Dump de variables
```php
dd($variable); // Dump and Die
dump($variable); // Solo Dump
```

---

## 📦 Comandos de Backup

### Backup de la base de datos
```bash
# Simplemente copia el archivo
copy database\database.sqlite database\backup\database_backup.sqlite
```

### Backup del storage
```bash
xcopy storage\app\public storage_backup\ /E /I /Y
```

---

## 🔄 Comandos de Actualización

### Actualizar dependencias PHP
```bash
composer update
```

### Actualizar dependencias JavaScript
```bash
npm update
```

### Ver dependencias desactualizadas
```bash
composer outdated
npm outdated
```

---

## 💻 Comandos Útiles de Windows

### Ver puertos en uso
```bash
netstat -ano | findstr :8000
```

### Matar proceso en puerto 8000
```bash
# Primero obtén el PID con netstat, luego:
taskkill /PID numero_pid /F
```

### Abrir directorio en explorador
```bash
explorer .
```

### Abrir VS Code en el proyecto
```bash
code .
```

---

## 📚 Recursos y Ayuda

### Ver ayuda de cualquier comando
```bash
php artisan help migrate
php artisan help serve
php artisan help db:seed
```

### Listar todos los comandos disponibles
```bash
php artisan list
```

---

## ✅ Verificación del Sistema

### Comando para verificar que todo funciona
```bash
# 1. Verificar PHP
php -v

# 2. Verificar Composer
composer --version

# 3. Verificar Node
node -v

# 4. Verificar NPM
npm -v

# 5. Verificar base de datos
php artisan db:show

# 6. Verificar rutas
php artisan route:list --compact

# 7. Verificar que el servidor funciona
php artisan serve
```

---

## 🎯 Atajos de Desarrollo

### Alias recomendados para PowerShell
Agrega a tu perfil de PowerShell (`$PROFILE`):

```powershell
# Alias para Laravel
function pa { php artisan $args }
function pas { php artisan serve }
function pam { php artisan migrate }
function pams { php artisan migrate:fresh --seed }
function pacc { php artisan optimize:clear }

# Alias para NPM
function nrd { npm run dev }
function nrb { npm run build }
```

Uso:
```bash
pas  # En lugar de php artisan serve
pams # En lugar de php artisan migrate:fresh --seed
```

---

**💡 Tip:** Guarda este archivo para referencia rápida durante el desarrollo.

**📌 Recuerda:** Siempre ejecuta los comandos desde el directorio raíz del proyecto: `c:\xampp\htdocs\tienda-oxxo`
