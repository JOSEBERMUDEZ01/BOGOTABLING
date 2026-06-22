# 🛍️ Bogotá Bling — Guía de Publicación

## Estructura del proyecto

```
bogota-bling/
├── index.html              ← Tienda principal
├── netlify.toml            ← Config Netlify
├── .gitignore
├── admin/
│   ├── index.html          ← Panel admin (Decap CMS)
│   └── config.yml          ← Configuración CMS
├── images/
│   └── products/           ← Fotos de productos
└── content/
    ├── products/           ← Archivos .md de cada producto
    └── settings/
        └── business.json   ← Config del negocio
```

---

## ✅ PASO 1 — Subir a GitHub

1. Ve a [github.com](https://github.com) → crea cuenta si no tienes
2. Clic en **"New repository"**
3. Nombre: `bogota-bling` → **Create repository**
4. Sube la carpeta completa:
   - Opción fácil: arrastra todos los archivos al repositorio en el navegador
   - O usa GitHub Desktop app

---

## ✅ PASO 2 — Conectar con Netlify

1. Ve a [netlify.com](https://netlify.com) → crea cuenta (gratis)
2. Clic **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** → autoriza → elige el repo `bogota-bling`
4. Configuración del deploy:
   - **Branch**: `main`
   - **Build command**: (dejar vacío)
   - **Publish directory**: `.`
5. Clic **"Deploy site"** → en 1 minuto tienes URL pública

---

## ✅ PASO 3 — Activar Identity (para el admin)

En Netlify, dentro de tu sitio:

1. **Site settings** → **Identity** → clic **"Enable Identity"**
2. En **Registration**: cambiar a **"Invite only"**
3. Bajar a **Services** → **Git Gateway** → clic **"Enable Git Gateway"**
4. En **Identity** → **Invite users** → escribe tu correo → **Send invite**
5. Revisa tu correo → acepta la invitación → crea tu contraseña

---

## ✅ PASO 4 — Entrar al admin

1. Ve a `tu-sitio.netlify.app/admin`
2. Inicia sesión con tu correo y contraseña
3. ¡Listo! Puedes agregar/editar/eliminar productos

---

## 📸 Agregar productos nuevos desde el admin

1. `/admin` → **"Productos"** → **"New Producto"**
2. Llena: nombre, categoría, precio, descripción
3. Sube la imagen → marca destacado/novedad si aplica
4. Clic **"Publish"** → el sitio se actualiza automáticamente en ~1 minuto

---

## 📞 Soporte técnico

**JB Tech Pro** — Desarrollo web profesional  
WhatsApp: +57 322 563 4059
