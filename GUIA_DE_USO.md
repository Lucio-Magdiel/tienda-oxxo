# Guía de Uso - Sistema de Tienda OXXO

## 🚀 Inicio Rápido

### 1. Iniciar el servidor

```bash
# Navegar al directorio del proyecto
cd c:\xampp\htdocs\tienda-oxxo

# Iniciar el servidor de Laravel
php artisan serve
```

El servidor estará disponible en: **http://localhost:8000**

### 2. Iniciar sesión

Usa una de las cuentas de prueba:

**Administrador:**
- Email: `admin@tienda-oxxo.com`
- Password: `password`

**Cajero:**
- Email: `cajero@tienda-oxxo.com`
- Password: `password`

---

## 📋 Módulos del Sistema

### 1️⃣ Dashboard (Panel Principal)

Al iniciar sesión verás el dashboard con:
- Accesos rápidos a todos los módulos
- Información general del sistema
- Enlaces directos a Categorías, Productos, Ventas y Reportes

### 2️⃣ Gestión de Categorías

**Listar Categorías**
- Ve a: `Dashboard > Categorías`
- Verás todas las categorías con su cantidad de productos
- Usa el buscador para filtrar categorías

**Crear Nueva Categoría**
1. Click en "Nueva Categoría"
2. Completa el formulario:
   - Nombre (requerido)
   - Descripción (opcional)
3. Click en "Guardar"

**Editar Categoría**
1. Click en "Editar" en la categoría deseada
2. Modifica los campos
3. Click en "Actualizar"

**Eliminar Categoría**
1. Click en "Eliminar"
2. Confirma la acción
   - ⚠️ Esto eliminará también todos sus productos asociados

---

### 3️⃣ Gestión de Productos

**Listar Productos**
- Ve a: `Dashboard > Productos`
- Verás todos los productos con información de stock
- **Colores de stock:**
  - 🔴 Rojo: Stock ≤ 10 (Bajo)
  - 🟡 Amarillo: Stock ≤ 50 (Medio)
  - 🟢 Verde: Stock > 50 (Alto)

**Buscar y Filtrar**
- Usa el campo de búsqueda para buscar por nombre o código
- Selecciona una categoría del dropdown
- Click en "Buscar"

**Crear Nuevo Producto**
1. Click en "Nuevo Producto"
2. Completa el formulario:
   - **Categoría:** Selecciona del dropdown (requerido)
   - **Código:** Código único del producto (ej: BEB001) (requerido)
   - **Nombre:** Nombre del producto (requerido)
   - **Descripción:** Detalles del producto (opcional)
   - **Precio:** Precio de venta (requerido)
   - **Stock:** Cantidad inicial en inventario (requerido)
   - **Imagen:** Foto del producto - máx 2MB (opcional)
3. Click en "Guardar"

**Editar Producto**
1. Click en "Editar" en el producto deseado
2. Modifica los campos necesarios
3. Para cambiar la imagen, selecciona una nueva (la anterior se eliminará)
4. Click en "Actualizar"

**Eliminar Producto**
1. Click en "Eliminar"
2. Confirma la acción
   - La imagen asociada también se eliminará

---

### 4️⃣ Sistema de Ventas (POS - Punto de Venta)

**Realizar una Nueva Venta**

1. Ve a: `Dashboard > Ventas > Nueva Venta`

2. **Panel Izquierdo - Lista de Productos:**
   - Usa el buscador para encontrar productos rápidamente
   - Click en "Agregar" para añadir productos al carrito
   - Solo se muestran productos con stock disponible

3. **Panel Derecho - Carrito:**
   - Verás los productos agregados con subtotales
   - Ajusta la cantidad usando el campo numérico
   - Click en "✕" para eliminar un producto del carrito
   - El total se calcula automáticamente

4. **Seleccionar Método de Pago:**
   - Efectivo
   - Tarjeta

5. Click en "Procesar Venta"

6. **Resultado:**
   - Se genera un folio único (ej: V-20251210-0001)
   - El inventario se actualiza automáticamente
   - Serás redirigido al detalle de la venta

**Ver Detalle de Venta**
- Muestra toda la información de la venta
- Lista de productos vendidos con precios
- Información del cajero
- Botón para imprimir ticket

**Listar Todas las Ventas**
1. Ve a: `Dashboard > Ventas`
2. **Filtrar por fechas:**
   - Selecciona fecha inicio y fecha fin
   - Click en "Filtrar"
3. Verás: Folio, Fecha, Cajero, Método de pago, Total
4. Click en "Ver" para ver el detalle

**Cancelar una Venta**
1. En la lista de ventas, click en "Cancelar"
2. Confirma la acción
3. ✅ El stock de los productos se restaura automáticamente

---

### 5️⃣ Reportes

**Acceder a Reportes**
- Ve a: `Dashboard > Reportes`
- Verás 3 tipos de reportes disponibles

#### 📊 Reporte de Ventas

1. Click en "Reporte de Ventas"
2. Selecciona el periodo:
   - Fecha inicio
   - Fecha fin
3. Click en "Generar Reporte"

**Información mostrada:**
- Total de ventas realizadas
- Ingresos totales del periodo
- Ventas por método de pago (Efectivo vs Tarjeta)
- Lista detallada de todas las ventas
- Botón para imprimir

#### 🏆 Productos Más Vendidos

1. Click en "Productos Más Vendidos"
2. Selecciona el periodo (fecha inicio y fin)
3. Click en "Generar Reporte"

**Información mostrada:**
- Ranking de productos ordenados por unidades vendidas
- Código y nombre del producto
- Categoría
- Total de unidades vendidas
- Ingresos generados por producto
- Botón para imprimir

#### 📦 Reporte de Inventario

1. Click en "Reporte de Inventario"
2. Se genera automáticamente (no requiere fechas)

**Información mostrada:**
- Total de productos en el sistema
- Valor total del inventario
- Productos con stock bajo (≤ 10 unidades)
- Tabla detallada con todos los productos:
  - Código, Nombre, Categoría
  - Precio, Stock actual
  - Valor en inventario (Precio × Stock)
  - Estado del stock (Bajo/Medio/Alto)
- Botón para imprimir

---

## 💡 Consejos y Buenas Prácticas

### Para Administradores

1. **Mantén las categorías organizadas**
   - Crea categorías antes de agregar productos
   - Usa nombres descriptivos

2. **Códigos de productos**
   - Usa un sistema consistente (ej: BEB001, BEB002 para bebidas)
   - Los códigos deben ser únicos

3. **Stock mínimo**
   - Revisa regularmente el reporte de inventario
   - Los productos en rojo (≤10) necesitan reabastecimiento

4. **Imágenes de productos**
   - Usa imágenes claras y de buena calidad
   - Máximo 2MB por imagen
   - Formatos: JPG, PNG, GIF, WEBP

### Para Cajeros

1. **Al realizar ventas**
   - Verifica el stock antes de agregar cantidades grandes
   - Usa el buscador para encontrar productos rápidamente
   - Revisa el total antes de procesar

2. **Si un producto no aparece**
   - Puede estar agotado (stock = 0)
   - Contacta al administrador

3. **Cancelación de ventas**
   - Solo cancela ventas cuando sea absolutamente necesario
   - El stock se restaura automáticamente

---

## ⚠️ Solución de Problemas Comunes

### No puedo agregar un producto al carrito
- **Causa:** El producto está agotado
- **Solución:** Contacta al administrador para reabastecer

### Error al subir imagen
- **Causa:** La imagen es muy grande
- **Solución:** Usa una imagen menor a 2MB

### No aparecen productos en la venta
- **Causa:** Todos los productos están agotados
- **Solución:** Edita los productos para agregar stock

### Error al generar reporte
- **Causa:** Fechas incorrectas o periodo sin datos
- **Solución:** Verifica las fechas y que existan ventas en ese periodo

---

## 🔒 Seguridad

- **Nunca compartas tus credenciales**
- **Cierra sesión al terminar**
- **Cambia tu contraseña regularmente:**
  - Ve a: `Configuración > Perfil > Cambiar contraseña`

---

## 📞 Soporte

Para problemas técnicos o dudas sobre el sistema, contacta al administrador del sistema.

---

**Versión del Sistema:** 1.0.0  
**Última actualización:** Diciembre 2025
