# Sistema de Tienda OXXO 🏪

> Sistema web completo de punto de venta y gestión para tienda OXXO con control de inventario, reportes y sistema de roles.

[![Laravel](https://img.shields.io/badge/Laravel-12.42-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

## 📋 Descripción

Sistema web de administración y punto de venta desarrollado con tecnologías modernas. Permite gestionar categorías, productos, ventas, inventario y generar reportes detallados. Incluye sistema de roles para administradores y cajeros, con impresiones optimizadas para tickets térmicos (80mm) y reportes A4.

## ✨ Características Principales

### 🛒 **Punto de Venta (POS)**
- Sistema de ventas con carrito de compras interactivo
- Búsqueda rápida de productos
- Múltiples métodos de pago (efectivo/tarjeta)
- Impresión de tickets optimizada para papel térmico 80mm
- Control automático de inventario al realizar ventas
- Generación de folios únicos por venta

### 📦 **Gestión de Inventario**
- CRUD completo de Categorías
- CRUD completo de Productos (con código, precio, stock, categoría)
- Alertas de stock bajo (≤10 unidades)
- Control de existencias en tiempo real
- Validación de stock antes de ventas

### 👥 **Sistema de Roles y Permisos**
- **Administrador**: Acceso completo a todas las funcionalidades
  - Gestión de categorías y productos
  - Acceso a todos los reportes
  - Visualización de ventas
  - Panel de estadísticas
- **Cajero**: Acceso limitado a operaciones de venta
  - Realizar ventas
  - Ver productos
  - Imprimir tickets
  - Sin acceso a categorías ni reportes

### 📊 **Reportes Empresariales**
- **Reporte de Ventas**: Análisis por periodo con totales, métodos de pago y detalles
- **Productos Más Vendidos**: Ranking de productos con unidades e ingresos generados
- **Estado de Inventario**: Vista completa del stock con valores y alertas
- Impresiones profesionales en formato A4 (portrait/landscape)
- Exportación directa a impresora

### 🔐 **Autenticación y Seguridad**
- Sistema de login/registro con Laravel Fortify
- Verificación de email
- Autenticación de dos factores (2FA) opcional
- Middleware de protección por roles
- Gestión de perfil de usuario
- Recuperación de contraseña

## 🛠️ Stack Tecnológico

### Backend
- **Laravel 12.42.0** - Framework PHP moderno y robusto
- **SQLite** - Base de datos ligera y eficiente
- **Laravel Fortify 1.32** - Sistema de autenticación completo
- **Inertia.js 2.0** - Bridge SPA Laravel-React sin API

### Frontend
- **React 19.2.0** - Librería UI moderna con Hooks
- **TypeScript 5.7** - Tipado estático y desarrollo seguro
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Vite 7.1** - Build tool ultrarrápido
- **Shadcn/ui** - Componentes UI accesibles

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Pest PHP** - Testing framework
- **GitHub Actions** - CI/CD

## 📋 Requisitos del Sistema

- **PHP** 8.4 o superior
- **Composer** (última versión)
- **Node.js** 18+ y npm
- **XAMPP** o cualquier servidor web con PHP
- **Navegador web** moderno (Chrome, Firefox, Edge)

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Lucio-Magdiel/tienda-oxxo.git
cd tienda-oxxo
```

### 2️⃣ Instalar Dependencias

**Dependencias PHP:**
```bash
composer install
```

**Dependencias JavaScript:**
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Generar la key de la aplicación
php artisan key:generate
```

### 4️⃣ Configurar Base de Datos

```bash
# Crear la base de datos SQLite
touch database/database.sqlite

# Ejecutar migraciones
php artisan migrate

# Poblar con datos de prueba
php artisan db:seed
```

Esto creará:
- ✅ 7 categorías (Bebidas, Snacks, Lácteos, etc.)
- ✅ 25 productos de ejemplo con stock
- ✅ 2 usuarios (admin y cajero)

### 5️⃣ Compilar Assets Frontend

**Para desarrollo con hot-reload:**
```bash
npm run dev
```

**Para producción:**
```bash
npm run build
```

### 6️⃣ Iniciar el Servidor

**Opción A: Servidor Laravel (Recomendado para desarrollo)**
```bash
php artisan serve
```
Abre: **http://localhost:8000**

**Opción B: Usando XAMPP/Apache**
1. Inicia Apache en XAMPP
2. Abre: **http://localhost/tienda-oxxo/public**

---

## 👤 Credenciales de Acceso

### 🔑 Administrador (Acceso Completo)
```
Email: admin@tienda-oxxo.com
Password: password
```
- Gestión de categorías, productos y ventas
- Acceso a todos los reportes
- Panel de estadísticas completo

### 🔑 Cajero (Acceso Limitado)
```
Email: cajero@tienda-oxxo.com
Password: password
```
- Realizar ventas
- Ver productos
- Imprimir tickets
- Sin acceso a reportes ni categorías

---

## 📊 Estructura de Base de Datos

### Modelo Entidad-Relación

```
users (1) ──────── (N) ventas
                        │
categorias (1) ─── (N) productos (N) ──── (N) detalle_ventas
                                                │
                                          ventas (1)
```

### Tablas

| Tabla | Descripción | Campos Principales |
|-------|-------------|-------------------|
| **users** | Usuarios del sistema | name, email, password, role |
| **categorias** | Categorías de productos | nombre, descripcion |
| **productos** | Catálogo de productos | codigo, nombre, precio, stock, categoria_id |
| **ventas** | Registro de ventas | folio, total, metodo_pago, user_id |
| **detalle_ventas** | Productos vendidos | venta_id, producto_id, cantidad, subtotal |

---

## 📱 Funcionalidades Detalladas

### 🏪 **Módulo de Ventas (POS)**
```
✓ Interfaz táctil optimizada para cajeros
✓ Búsqueda instantánea de productos
✓ Carrito con actualización en tiempo real
✓ Validación de stock antes de agregar
✓ Cálculo automático de totales
✓ Selección de método de pago
✓ Generación de folio único
✓ Impresión de ticket térmico 80mm
✓ Actualización automática de inventario
```

### 📦 **Módulo de Inventario**
```
✓ CRUD completo de categorías
✓ CRUD completo de productos
✓ Gestión de stock en tiempo real
✓ Alertas visuales de stock crítico
✓ Búsqueda y filtros avanzados
✓ Validaciones de existencias
```

### 📈 **Módulo de Reportes** (Solo Admin)
```
✓ Reporte de Ventas por Periodo
  - Total de ventas
  - Ingresos totales
  - Desglose por método de pago
  - Detalle de cada venta

✓ Productos Más Vendidos
  - Ranking de productos
  - Unidades vendidas
  - Ingresos generados por producto

✓ Estado de Inventario
  - Valor total del inventario
  - Productos con stock bajo
  - Estado de cada producto
```

### 👥 **Módulo de Gestión de Usuarios**
```
✓ Sistema de roles (admin/cajero)
✓ Perfil de usuario editable
✓ Cambio de contraseña
✓ Autenticación 2FA opcional
✓ Gestión de sesiones
```
---

## 🔧 Comandos Útiles

### Base de Datos
```bash
# Resetear base de datos con datos de prueba
php artisan migrate:fresh --seed

# Solo ejecutar migraciones
php artisan migrate

# Ver estado de migraciones
php artisan migrate:status
```

### Caché y Optimización
```bash
# Limpiar toda la caché
php artisan optimize:clear

# Limpiar cachés específicos
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Crear enlace simbólico para storage (imágenes)
php artisan storage:link
```

### Desarrollo
```bash
# Compilar assets en modo desarrollo (hot reload)
npm run dev

# Compilar assets para producción
npm run build

# Ejecutar pruebas
php artisan test
```

---

## 🗺️ Rutas de la Aplicación

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Página de bienvenida | Público |
| `/login` | Iniciar sesión | Público |
| `/register` | Registro de usuario | Público |
| `/dashboard` | Panel principal | Autenticado |
| `/categorias` | Gestión de categorías | Admin |
| `/productos` | Gestión de productos | Admin + Cajero |
| `/ventas` | Punto de venta | Admin + Cajero |
| `/ventas/create` | Realizar nueva venta | Admin + Cajero |
| `/reportes` | Panel de reportes | Solo Admin |
| `/reportes/ventas` | Reporte de ventas | Solo Admin |
| `/reportes/productos-vendidos` | Top productos | Solo Admin |
| `/reportes/inventario` | Estado inventario | Solo Admin |

---

## 📝 Notas Técnicas

### 🎯 Datos de Prueba (Seeders)
- **CategoriaSeeder**: 7 categorías (Bebidas, Snacks, Lácteos, Panadería, Limpieza, Cuidado Personal, Dulces)
- **ProductoSeeder**: 25 productos realistas con stock y precios
- **DatabaseSeeder**: 2 usuarios (admin y cajero)

### ✅ Validaciones Implementadas
```
✓ Códigos de producto únicos
✓ Stock mínimo en ventas (no vender sin existencias)
✓ Cantidades positivas en ventas
✓ Precios válidos (> 0)
✓ Imágenes (jpg, png, max 2MB)
✓ Emails únicos en usuarios
```

### 🔒 Seguridad y Protección
```
✓ Protección CSRF en todos los formularios
✓ Autenticación requerida (middleware auth)
✓ Autorización por roles (middleware admin)
✓ Sanitización de entradas
✓ Validación de formularios (server-side)
✓ Passwords hasheados con bcrypt
✓ Rate limiting en login
```

### 🎨 Características de UI/UX
```
✓ Diseño responsive (móvil, tablet, desktop)
✓ Dark mode / Light mode
✓ Notificaciones toast (éxito/error)
✓ Confirmaciones antes de eliminar
✓ Loading states en operaciones async
✓ Sidebar colapsable
✓ Breadcrumbs de navegación
```

---

## 🖨️ Sistema de Impresión

### Tickets de Venta (80mm térmico)
- Formato optimizado para papel térmico de 80mm
- Diseño compacto con toda la información
- Encabezado, productos, totales y pie
- CSS `@media print` personalizado
- Un solo ticket por página

### Reportes (A4)
- **Ventas**: Formato vertical (portrait)
- **Productos**: Formato vertical (portrait)  
- **Inventario**: Formato horizontal (landscape)
- Encabezados profesionales con logo
- Tablas con bordes y espaciado optimizado
- Fecha de generación automática

---

## 📄 Documentación Adicional

El proyecto incluye guías detalladas en archivos markdown:

- 📖 **GUIA_DE_USO.md** - Manual completo del usuario
- 🚀 **INICIO_RAPIDO.md** - Guía de inicio rápido
- 👥 **SISTEMA_DE_ROLES.md** - Explicación del sistema de roles
- 🔄 **ACTUALIZACION_ROLES.md** - Cómo actualizar roles de usuarios
- 📋 **RESUMEN_PROYECTO.md** - Resumen técnico del proyecto
- ⚡ **COMANDOS_UTILES.md** - Comandos Laravel frecuentes

---

## 🤝 Contribuciones

¿Quieres contribuir? ¡Excelente! 

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📧 Contacto y Soporte

**Desarrollador:** Lucio Magdiel Baca Sapa  
**Email:** 74097146@iesdivinojesus.edu.pe  
**GitHub:** [@Lucio-Magdiel](https://github.com/Lucio-Magdiel)

---

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🙏 Agradecimientos

- Laravel Framework por su elegante sintaxis
- React por su ecosistema robusto
- Inertia.js por simplificar la comunicación frontend-backend
- Tailwind CSS por su sistema de utilidades
- Shadcn/ui por sus componentes accesibles

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Hecho con ❤️ usando Laravel + React + TypeScript

</div>

Este es un proyecto educativo/demostrativo. Para preguntas o sugerencias, por favor contacta al desarrollador.

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

**Desarrollado con ❤️ usando Laravel, React e Inertia.js**
