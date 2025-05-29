# Frontend – Sistema de Gestión de Reservas 🧾📆

Este proyecto es la interfaz de usuario del sistema de gestión de reservas, diseñada para facilitar la administración de reservas a través de roles (Administrador y Trabajador). Se conecta con una API RESTful desarrollada en Node.js.

## 🌐 Demo online

Accede a la app en vivo:  
👉 https://centralreservas.jorgeesquivafullstack.es/login

## 📦 Repositorio del backend

🔗 [Central-Reservas-BackEnd (API)](https://github.com/Jorgesq9/Central-Reservas-BackEnd)

## 🛠 Tecnologías utilizadas

- **React**
- **CSS personalizado**
- **Axios** para llamadas a la API
- **React Router DOM** para navegación
- **Cloudflare Tunnel** para despliegue

## 🔐 Sistema de autenticación

- Inicio de sesión con JWT
- Validación de roles: administrador y trabajador
- Protección de rutas según permisos

## ⚙️ Características principales

- Gestión de reservas (CRUD)
- Filtros avanzados: estado, prioridad, nombre del cliente
- Panel de estadísticas
- Responsive design para escritorio y móvil

## 📂 Estructura del proyecto
```bash
Central-reservas/
│── src/
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Vistas principales (Login, Dashboard, etc.)
│ ├── services/ # Conexión con la API
│ ├── assets/ # Logos e imágenes
│ └── App.jsx # Componente raíz
│── public/ # Archivos estáticos
│── package.json # Dependencias y scripts
│── vite.config.js # Configuración de Vite
└── README.md # Este documento

```

## 🚀 Cómo levantarlo localmente

```bash
git clone https://github.com/Jorgesq9/Central-reservas.git
cd Central-reservas
npm install
npm run dev
```
🌍 Despliegue actual

El frontend está alojado en un servidor casero a través de Cloudflare Tunnel, lo que garantiza acceso seguro sin necesidad de IP pública ni puertos abiertos.

📜 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

👤 Autor

Jorge Esquiva
Desarrollador Full-Stack
🌐 jorgeesquivafullstack.es
🐙 GitHub




