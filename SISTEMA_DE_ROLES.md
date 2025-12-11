# 🔐 SISTEMA DE ROLES - TIENDA OXXO

## 📋 DESCRIPCIÓN

El sistema ahora cuenta con **dos roles diferenciados** que permiten controlar el acceso a las funcionalidades según el tipo de usuario:

```
┌─────────────────────────────────────────────────────┐
│  ROL           │  DESCRIPCIÓN                       │
├─────────────────────────────────────────────────────┤
│  ADMIN         │  Acceso completo al sistema        │
│  CAJERO        │  Acceso a ventas y consultas       │
└─────────────────────────────────────────────────────┘
```

## 👥 USUARIOS DEL SISTEMA

### 🔑 ADMINISTRADOR
```
📧 Email:    admin@tienda-oxxo.com
🔒 Password: password
🎯 Rol:      admin
```

### 💼 CAJERO
```
📧 Email:    cajero@tienda-oxxo.com
🔒 Password: password
🎯 Rol:      cajero
```

## 🎯 PERMISOS POR ROL

### 👨‍💼 ADMINISTRADOR (admin)
**Acceso completo** a todas las funcionalidades:

✅ **Dashboard**
   - Ver panel principal
   - Accesos rápidos a todos los módulos

✅ **Ventas**
   - ➕ Crear nueva venta (POS)
   - 📋 Ver historial de ventas
   - 👁️ Ver detalles de ventas
   - ❌ Cancelar ventas

✅ **Productos**
   - 📋 Listar productos
   - ➕ Crear productos
   - ✏️ Editar productos
   - ❌ Eliminar productos
   - 👁️ Ver detalles

✅ **Categorías**
   - 📋 Listar categorías
   - ➕ Crear categorías
   - ✏️ Editar categorías
   - ❌ Eliminar categorías

✅ **Reportes**
   - 📊 Reporte de ventas
   - 📈 Productos más vendidos
   - 📦 Estado de inventario
   - 🖨️ Imprimir reportes

---

### 👩‍💼 CAJERO (cajero)
**Acceso limitado** enfocado en ventas:

✅ **Dashboard**
   - Ver panel principal
   - Accesos rápidos a módulos permitidos

✅ **Ventas**
   - ➕ Crear nueva venta (POS) ⭐
   - 📋 Ver historial de ventas
   - 👁️ Ver detalles de ventas
   - ❌ Cancelar ventas

✅ **Productos**
   - 📋 Listar productos (solo lectura)
   - 👁️ Ver detalles (solo lectura)
   - 🔍 Buscar productos

❌ **Categorías**
   - Sin acceso (solo admin)

❌ **Reportes**
   - Sin acceso (solo admin)

## 📱 NAVEGACIÓN DEL SIDEBAR

### Para ADMINISTRADOR
```
🏠 Dashboard
💵 Nueva Venta        ← Acceso rápido al POS
💰 Ventas
🛒 Productos
📦 Categorías
📊 Reportes
```

### Para CAJERO
```
🏠 Dashboard
💵 Nueva Venta        ← Acceso rápido al POS
💰 Ventas
🛒 Productos
```

## 🚀 FLUJO DE TRABAJO POR ROL

### 📌 Flujo del CAJERO (Operación diaria)
```
1. LOGIN
   ↓
2. DASHBOARD
   ↓
3. NUEVA VENTA (clic en botón "Nueva Venta")
   ↓
4. BUSCAR PRODUCTOS
   ↓
5. AGREGAR AL CARRITO
   ↓
6. REGISTRAR VENTA
   ↓
7. VER DETALLE / IMPRIMIR TICKET
   ↓
8. REPETIR (siguiente venta)
```

### 📌 Flujo del ADMINISTRADOR (Gestión completa)
```
1. LOGIN
   ↓
2. DASHBOARD
   ↓
3. GESTIONAR CATEGORÍAS Y PRODUCTOS
   ↓
4. REALIZAR VENTAS (si es necesario)
   ↓
5. REVISAR REPORTES
   ↓
6. ANALIZAR INVENTARIO
   ↓
7. TOMAR DECISIONES
```

## 🔒 IMPLEMENTACIÓN TÉCNICA

### Base de Datos
```sql
-- Columna agregada a tabla users
ALTER TABLE users ADD COLUMN role VARCHAR(255) DEFAULT 'cajero';

-- Valores permitidos:
-- 'admin'  → Administrador
-- 'cajero' → Cajero
```

### Middleware
```php
// Middleware: EnsureUserIsAdmin
// Archivo: app/Http/Middleware/EnsureUserIsAdmin.php

// Verifica que el usuario tenga rol 'admin'
// Se aplica a rutas protegidas
```

### Rutas Protegidas
```php
// routes/web.php

// ✅ Acceso para TODOS los usuarios autenticados
Route::get('productos', [ProductoController::class, 'index']);
Route::resource('ventas', VentaController::class);

// 🔐 Solo para ADMINISTRADORES
Route::middleware(['admin'])->group(function () {
    Route::resource('categorias', CategoriaController::class);
    Route::resource('productos', ProductoController::class)->except(['index', 'show']);
    Route::prefix('reportes')->group(...);
});
```

### Frontend (React/Inertia)
```tsx
// Acceso al rol del usuario
const { auth } = usePage().props;
const isAdmin = auth?.user?.role === 'admin';

// Renderizado condicional
{isAdmin && (
    <Link href="/categorias">Categorías</Link>
)}
```

## 🎓 CASOS DE USO

### ✅ Caso 1: Cajero realiza venta
```
1. Cajero inicia sesión
2. Ve botón "Nueva Venta" destacado en dashboard
3. Clic en "Nueva Venta"
4. Busca productos y agrega al carrito
5. Completa la venta
6. Imprime ticket
✅ ÉXITO: Stock actualizado automáticamente
```

### ✅ Caso 2: Cajero intenta acceder a Categorías
```
1. Cajero inicia sesión
2. No ve opción "Categorías" en sidebar
3. Si intenta URL directa: /categorias
❌ ERROR 403: "No tienes permiso para acceder a esta sección"
```

### ✅ Caso 3: Admin gestiona productos
```
1. Admin inicia sesión
2. Ve todas las opciones en sidebar
3. Accede a "Productos"
4. Puede crear, editar, eliminar
5. Accede a "Reportes"
6. Analiza inventario y ventas
✅ ÉXITO: Control total del sistema
```

### ✅ Caso 4: Cajero consulta productos
```
1. Cajero inicia sesión
2. Accede a "Productos"
3. Puede ver listado y buscar
4. Puede ver detalles
❌ NO VE: Botones de crear, editar, eliminar
✅ ÉXITO: Consulta sin modificar
```

## 📊 MATRIZ DE PERMISOS

```
┌─────────────────────────────────────────────────────────────┐
│  FUNCIONALIDAD         │  ADMIN  │  CAJERO  │               │
├─────────────────────────────────────────────────────────────┤
│  Dashboard             │   ✅    │   ✅     │               │
│  Nueva Venta (POS)     │   ✅    │   ✅     │  Destacado    │
│  Ventas - Listar       │   ✅    │   ✅     │               │
│  Ventas - Ver          │   ✅    │   ✅     │               │
│  Ventas - Cancelar     │   ✅    │   ✅     │               │
│  Productos - Listar    │   ✅    │   ✅     │  Solo lectura │
│  Productos - Ver       │   ✅    │   ✅     │  Solo lectura │
│  Productos - Crear     │   ✅    │   ❌     │               │
│  Productos - Editar    │   ✅    │   ❌     │               │
│  Productos - Eliminar  │   ✅    │   ❌     │               │
│  Categorías (TODO)     │   ✅    │   ❌     │               │
│  Reportes (TODO)       │   ✅    │   ❌     │               │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ COMANDOS ÚTILES

### Crear nuevo usuario Admin
```php
php artisan tinker

User::create([
    'name' => 'Nuevo Admin',
    'email' => 'nuevo@admin.com',
    'password' => bcrypt('password'),
    'role' => 'admin',
    'email_verified_at' => now(),
]);
```

### Crear nuevo usuario Cajero
```php
php artisan tinker

User::create([
    'name' => 'Cajero 2',
    'email' => 'cajero2@tienda-oxxo.com',
    'password' => bcrypt('password'),
    'role' => 'cajero',
    'email_verified_at' => now(),
]);
```

### Cambiar rol de usuario existente
```php
php artisan tinker

$user = User::where('email', 'cajero@tienda-oxxo.com')->first();
$user->role = 'admin';
$user->save();
```

### Ver todos los usuarios y sus roles
```php
php artisan tinker

User::all(['name', 'email', 'role']);
```

## ✨ VENTAJAS DEL SISTEMA

### 🔐 Seguridad
- Control granular de accesos
- Middleware protege rutas sensibles
- Validación en backend y frontend

### 👥 Gestión de Personal
- Múltiples cajeros sin riesgo
- Separación clara de responsabilidades
- Trazabilidad de acciones

### 📈 Escalabilidad
- Fácil agregar nuevos roles
- Sistema extensible
- Arquitectura modular

### 💼 Operativo
- Cajeros enfocados en ventas
- Admins controlan inventario y reportes
- Interfaz adaptada a cada rol

## 🎯 RECOMENDACIONES

### Para Administradores
1. ✅ Revisa reportes diariamente
2. ✅ Mantén inventario actualizado
3. ✅ Monitorea alertas de stock bajo
4. ✅ Capacita a cajeros en POS

### Para Cajeros
1. ✅ Usa el botón "Nueva Venta" para agilizar
2. ✅ Verifica stock antes de vender
3. ✅ Imprime tickets para clientes
4. ✅ Consulta productos cuando tengas dudas

## 🆘 SOPORTE

### ¿Cajero necesita más permisos?
Contacta al administrador del sistema para cambiar rol.

### ¿Olvidaste tu contraseña?
Usa la opción "¿Olvidaste tu contraseña?" en login.

### ¿Necesitas ayuda?
Consulta los archivos de documentación:
- `README.md` → Documentación técnica
- `GUIA_DE_USO.md` → Manual de usuario
- `INICIO_RAPIDO.md` → Guía rápida

---

**Actualizado:** Diciembre 2025  
**Versión:** 1.1.0 con Sistema de Roles  
**Estado:** 🟢 PRODUCCIÓN
