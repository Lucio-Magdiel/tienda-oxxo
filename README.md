# Sistema de Tienda OXXO 🏪

Sistema web completo de gestión para tienda OXXO desarrollado con Laravel 12, Inertia.js y React.

## Características

✅ **CRUD Completo**
- Gestión de Categorías
- Gestión de Productos (con imágenes)
- Gestión de Ventas
- Control de inventario automático

🔐 **Autenticación**
- Sistema de login/registro con Laravel Fortify
- Verificación de email
- Autenticación de dos factores (2FA)
- Gestión de perfil de usuario

📊 **Reportes**
- Reporte de Ventas por periodo
- Productos más vendidos
- Estado de Inventario
- Alertas de stock bajo

## Tecnologías Utilizadas

### Backend
- **Laravel 12.42.0** - Framework PHP
- **SQLite** - Base de datos
- **Laravel Fortify** - Autenticación
- **Inertia.js** - Bridge Laravel-React

### Frontend
- **React 19.2.0** - Librería UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4.1** - Estilos
- **Vite** - Build tool

## Requisitos Previos

- PHP 8.4 o superior
- Composer
- Node.js 18+ y npm
- XAMPP (o cualquier servidor con Apache y PHP)

## Instalación

### 1. Clonar o descargar el proyecto

El proyecto ya está en: `c:\xampp\htdocs\tienda-oxxo`

### 2. Instalar dependencias PHP

```bash
composer install
```

### 3. Instalar dependencias JavaScript

```bash
npm install
```

### 4. Configurar base de datos

La base de datos SQLite ya está configurada. Las migraciones y seeders ya fueron ejecutados con:
- 7 categorías de productos
- 25 productos de ejemplo
- 2 usuarios de prueba

### 5. Compilar assets (si es necesario)

```bash
# Para desarrollo (con hot reload)
npm run dev

# Para producción
npm run build
```

## Usuarios de Prueba

### Administrador
- **Email:** admin@tienda-oxxo.com
- **Password:** password

### Cajero
- **Email:** cajero@tienda-oxxo.com
- **Password:** password

## Iniciar la Aplicación

### Opción 1: Servidor de desarrollo de Laravel

```bash
php artisan serve
```

Luego abre: http://localhost:8000

### Opción 2: Usando XAMPP

1. Asegúrate de que Apache esté corriendo en XAMPP
2. Abre en el navegador: http://localhost/tienda-oxxo/public

## Estructura de la Base de Datos

### Tablas Principales

**categorias**
- id
- nombre
- descripcion
- timestamps

**productos**
- id
- categoria_id (FK)
- codigo (único)
- nombre
- descripcion
- precio
- stock
- imagen
- timestamps

**ventas**
- id
- user_id (FK)
- folio (único)
- total
- metodo_pago (efectivo/tarjeta)
- timestamps

**detalle_ventas**
- id
- venta_id (FK)
- producto_id (FK)
- cantidad
- precio_unitario
- subtotal
- timestamps

## Funcionalidades Principales

### 1. Gestión de Categorías
- Listar todas las categorías
- Crear nueva categoría
- Editar categoría existente
- Eliminar categoría
- Ver cantidad de productos por categoría

### 2. Gestión de Productos
- Listar productos con paginación
- Buscar productos por nombre o código
- Filtrar por categoría
- Crear producto con imagen
- Editar producto
- Eliminar producto
- Alertas visuales de stock (bajo/medio/alto)

### 3. Sistema de Ventas
- Interfaz de punto de venta
- Búsqueda rápida de productos
- Carrito de compras interactivo
- Generación automática de folio
- Selección de método de pago
- Actualización automática de inventario
- Vista de detalle de venta
- Impresión de ticket
- Cancelación de venta (restaura inventario)

### 4. Reportes
- **Reporte de Ventas:** Ventas por periodo, totales por método de pago
- **Productos Vendidos:** Ranking de productos más vendidos
- **Inventario:** Estado actual, valor total, productos con stock bajo
- Funcionalidad de impresión en todos los reportes

## Comandos Útiles

### Resetear la base de datos

```bash
php artisan migrate:fresh --seed
```

### Limpiar caché

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Crear enlace simbólico para storage (imágenes)

```bash
php artisan storage:link
```

## Rutas Principales

- `/` - Página de bienvenida
- `/login` - Iniciar sesión
- `/register` - Registrarse
- `/dashboard` - Panel principal
- `/categorias` - Gestión de categorías
- `/productos` - Gestión de productos
- `/ventas` - Gestión de ventas
- `/reportes` - Sistema de reportes

## Notas de Desarrollo

### Seeders incluidos
- `CategoriaSeeder`: 7 categorías (Bebidas, Snacks, Lácteos, etc.)
- `ProductoSeeder`: 25 productos con precios y stock realistas
- `DatabaseSeeder`: 2 usuarios de prueba

### Validaciones implementadas
- Códigos de producto únicos
- Validación de stock en ventas
- Validación de imágenes (max 2MB)
- Validación de precios y cantidades

### Seguridad
- Protección CSRF
- Autenticación requerida para todas las operaciones
- Sanitización de entradas
- Validación de formularios

## Despliegue Local

### Con PHP Built-in Server

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

### Con XAMPP

1. Asegúrate de que el proyecto esté en `c:\xampp\htdocs\tienda-oxxo`
2. Inicia Apache desde el panel de control de XAMPP
3. Accede a: http://localhost/tienda-oxxo/public

## Soporte y Contribuciones

Este es un proyecto educativo/demostrativo. Para preguntas o sugerencias, por favor contacta al desarrollador.

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

**Desarrollado con ❤️ usando Laravel, React e Inertia.js**
