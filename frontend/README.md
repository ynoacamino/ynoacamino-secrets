# Gestor de Secretos con PocketBase y Next.js  

Este proyecto es una aplicación web para la gestión segura de secretos, organizada en grupos y con autenticación basada en PocketBase.  

## 🚀 Características  

- **Autenticación** mediante tokens secretos.  
- **Gestión de secretos**: creación, edición y eliminación.  
- **Agrupación de secretos** por categorías.  
- **Interfaz moderna y responsiva** con React y Tailwind CSS.  
- **Backend ligero** basado en PocketBase.  

## 🛠️ Tecnologías  

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS  
- **Backend**: PocketBase  
- **Base de Datos**: SQLite (integrado en PocketBase) 

## 🖼️ Capturas de Pantalla 
![Captura de Pantalla 1](https://ynoa-uploader.ynoacamino.site/uploads/1738196355_Screenshot%20from%202025-01-29%2019-18-43.png)

## 📂 Estructura del Proyecto  

```plaintext
frontend/
│── src/
│   ├── components/  # Componentes reutilizables
│   ├── config/      # Configuración global
│   ├── lib/         # Lógica de autenticación y conexión con PocketBase
│   ├── types/       # Definiciones de tipos de datos
│   ├── pages/       # Páginas de la aplicación
│   ├── styles/      # Estilos globales
│   └── utils/       # Funciones auxiliares
│── public/          # Archivos estáticos
│── .env             # Variables de entorno
│── package.json     # Dependencias y scripts
│── README.md        # Este archivo
```  

## 🔧 Instalación y Configuración  

### 1️⃣ Clonar el Repositorio  

```sh
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

### 2️⃣ Instalar Dependencias  

```sh
cd frontend
npm install
```

### 3️⃣ Configurar Variables de Entorno  

Crea un archivo `.env` en `frontend/` con las siguientes variables:  

```ini
BACKEND_URL=http://localhost:8090
SECRET_LABEL=secretToken
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=superseguro123
```

### 4️⃣ Iniciar el Backend (PocketBase)  

Descarga y ejecuta PocketBase:  

```sh
./pocketbase serve
```

### 5️⃣ Iniciar el Frontend  

```sh
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.  

## 📌 Uso  

1. **Inicia sesión** con un usuario de PocketBase.  
2. **Crea grupos de secretos** para organizar la información.  
3. **Agrega secretos** dentro de los grupos creados.  
4. **Edita o elimina** secretos según sea necesario.  

## 🛡️ Seguridad  

- **Encriptación de datos sensibles** en el backend.  
- **Tokens de autenticación** para proteger los secretos.  
- **Control de acceso** a través de PocketBase.  

## 📜 Licencia  

Este proyecto está bajo la licencia MIT. ¡Siéntete libre de contribuir y mejorar la aplicación!  
