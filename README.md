# Programación III TP N°3 - API REST

## 🚀 Impuls*API* - Descripción

**ImpulsAPI** es una API RESTful desarrollada con **Node.js** y **Express** para el Trabajo Práctico N°3 de la materia Programación III. Su objetivo es proporcionar un backend robusto y estructurado capaz de gestionar información clave de una plataforma web, incluyendo perfiles de usuario, un catálogo de servicios, datos del equipo de desarrollo y un sistema de autenticación básico.

El proyecto implementa una arquitectura modular separando rutas, controladores y modelos, y utiliza archivos JSON estáticos para simular la persistencia de datos. Diseñada para integrarse de forma asíncrona con un Front-end dinámico, la API permite aplicar las mejores prácticas de desarrollo backend, manejo de errores con try/catch y la distribución eficiente del trabajo en equipo.

## 👥 Integrantes - Grupo 19
- [@fedeheinrich](https://github.com/fedeheinrich) - Federico Heinrich
- [@Tincho2319](https://github.com/Tincho2319) - Martin Alcaraz
- [@Nahuelete](https://github.com/Nahuelete) - Nahuel Cappa
- [@Oviedo-Matias](https://github.com/Oviedo-Matias) - Matias Oviedo
- [@nicc-essp](https://github.com/nicc-essp) - Nicolas Espulef
- [@HomeroColomboArg](https://github.com/HomeroColomboArg) - Homero Colombo

## 🛠️ Metodologia de Trabajo

Para mantener el repositorio organizado entre los seis, utilizamos la estrategia de ramificación **Git Flow** y los **estandares de contribución** detallados más abajo.

### Estrategia de Ramificación Git Flow

* main: Código en su version estable y completa (V1.0).

* release/x.0 : Preparacion de una nueva version. Se crea cuando develop tiene suficientes funcionalidades para una entrega, sirve para corregir errores menores durante la revision, ajustar numeros de version, actualizar documentacion y **IMPORTANTE: no agregar funcionalidades nuevas**.
    > *Se crea desde **develop***, y una vez que se completa el trabajo en dicha rama (obtenemos la version estable) se realiza el merge a develop y a main para actualizar el codigo en ambas ramas.
* develop: rama de desarrollo.

* feature/nombre-de-la-funcionalidad: Para crear nuevas funcionalidades. 
    > *Se crea desde **develop*** para trabajar en una nueva funcion a implementar. Una vez completada la funcionalidad, se hace el merge a develop y se elimina la rama.

* hotfix: Correcion urgente de un error que se encuentra en main.
    > Cuando encontramos un error importante en la version estable, *se crea desde **main*** para trabajar en la correcion del error y solucionarlo lo antes posible. Una vez corregido el bug, se hace el merge a main y a develop.

### Estandares de contribución

- **Commits**: Utilizar titulos descriptivos con el formato `tipo: descripción`. 
    > Ejemplo: `feat: implementación de login` o `fix: corrección de ruta API`.

- **Revisiones de Pull Requests (PR)**: Al menos un compañero de equipo debe revisar una solicitud de incorporacion de cambios antes de fusionarla (merge) con develop.

## 📂 Estructura del Proyecto
    ProgramacionIII-Practico-3/  
    │── app.js                  # Punto de entrada de la aplicación
    ├── package-lock.json                    
    ├── package.json                        
    │── .gitignore  
    │── controllers/
    │   ├── serviciosController.js
    │   ├── equipoController.js
    │   ├── perfilController.js
    │   └── autorizacionController.js
    │── data/
    │   ├── servicios.json
    │   ├── serviciosDetalle.json
    │   ├── equipo.json
    │   └── usuarios.json
    │── models/
    │   └── server.js
    │── routes/
    │   ├── serviciosRoutes.js
    │   ├── equipoRoutes.js 
    │   ├── perfilRoutes.js 
    │   └── autorizacionRoutes.js 
    ├── ROADMAP.md              # Hoja de ruta y division de tareas
    └── README.md               # Documentacion general

## 🗂️ División de Archivos

A continuación, se detalla la responsabilidad de cada integrante sobre los archivos del repositorio:

| Responsable | Archivos y Carpetas Principales | Funcionalidad / Módulo |
| :--- | :--- | :--- |
| **Martin Alcaraz** | `app.js`, `server.js`, `models/`, `data/usuarios.json`, `js/login.js`, `js/contacto.js`, `js/layout.js`, `js/main.js`, `js/utils.js`,`js/servicios.js` | Inicialización, deploy de la API, backend de perfil y scripts de frontend . |
| **Federico Heinrich** | `README.md`, `ROADMAP.md`, `pages/perfil.html`, `pages/registro.html`, `pages/login.html`, `css/perfil.css`, `css/registro.css`, `css/login.css`, `js/perfil.js` | Documentación técnica y frontend de registro, login y perfil de usuario. |
| **Matias Oviedo** | `data/servicios.json`, `pages/servicios.html`, `css/servicios.css` | Gestión y visualización del listado completo de servicios. |
| **Nahuel Cappa** | `controllers/serviciosController.js`, `js/buscador.js` | Detalle de servicios y lógica de filtrado/búsqueda. |
| **Homero Colombo** | `data/equipo.json`, `pages/equipo.html`, `css/equipo.css` | Backend y frontend del equipo + deploy en GitHub Pages. |
| **Nicolas Espulef** | `controllers/loginController.js` | Sistema de login, efectos de carga (spinners) y logs. |

## ⚡ Funciones JS

El backend de la API está estructurado utilizando el patrón MVC (Modelo-Vista-Controlador). A continuación, se detallan las funciones principales encargadas de la lógica de negocio y el enrutamiento:

**Modelos (`models/server.js`)**
* `Server`: Clase principal que inicializa la aplicación Express.
    * `middleware()`: Configura CORS y el parseo de JSON (`express.json()`).
    * `rutas()`: Define los endpoints principales de la API (`/servicios`, `/login`, `/equipo`, `/perfil`) y el manejo de errores (404 y 500).
    * `listen()`: Levanta el servidor en el puerto especificado.

**Controladores (`controllers/`)**
* **Autorización (`autorizacionController.js`)**:
    * `login(req, res)`: Recibe credenciales (email y contraseña), las valida contra `usuarios.json` y retorna un mensaje de éxito con el nombre del usuario o un error 401 si son incorrectas.
* **Equipo (`equipoController.js`)**:
    * `obtenerEquipo(req, res)`: Lee de forma asíncrona el archivo `equipo.json` y retorna el listado completo de los desarrolladores del proyecto.
* **Perfil (`perfilController.js`)**:
    * `getPerfilById(req, res)`: Busca un usuario específico por su `id` dentro de `usuarios.json` y retorna su información (incluyendo historial de pedidos). Si no existe, devuelve un error 404.
* **Servicios (`serviciosController.js`)**:
    * `getServicios(req, res)`: Retorna el catálogo general de servicios leyendo `servicios.json`.
    * `getServiciosById(req, res)`: Busca un servicio específico por su `id` en `serviciosDetalle.json` y devuelve su información detallada.

## ⚙️ Estructura de archivos JSON

Los datos de la aplicación se simulan utilizando archivos JSON estáticos ubicados en la carpeta `data/`. A continuación se muestra la estructura de cada uno:

### 1. Usuarios (`usuarios.json`)
Almacena la información de los clientes registrados, incluyendo sus credenciales y el historial de servicios contratados.
```json
[
  {
    "id": 1,
    "nombre": "Pepe Argento",
    "email": "pepeargento@ejemplo.com",
    "password": "123",
    "fechaRegistro": "Miembro desde el 26 de mayo de 2024",
    "imagen": "../assets/img/perfil-placeholder.png",
    "pedidos": [
      {
        "titulo": "Desarrollo de App Mobile",
        "imagen": "../assets/img/servicios_img/img_desarrollo_mobile.jpg",
        "estado": "Entregado el 10/04/2026"
      }
    ]
  }
]
```
 ### 2. Servicios (`servicios.json`)
Contiene el catálogo general de los servicios ofrecidos por la empresa para ser mostrados en la vista principal.
```json
[
  {
    "id": 1,
    "nombre": "Desarrollo Web",
    "desc": "Creacion y mantenimiento de sitios y aplicaciones web modernas.",
    "precio": 5000
  }
]
```
### 3. Detalle de servicios (`servicios.json`)
Almacena información complementaria o específica para la vista de detalle de cada servicio individual.
```json
[
  { 
    "id": 1, 
    "desc": "Desarrollo Web", 
    "precio": 5000
  }
]
```
### 4. Equipo (equipo.json)
Mantiene la información de los desarrolladores (Grupo 19) para renderizar dinámicamente la sección "Sobre Nosotros" o "Equipo".
```json
[
  {
    "id": 1,
    "nombre": "Federico Heinrich",
    "rol": "Documentación y frontend de perfil",
    "descripcion": "Encargado del README, roadmap y vistas de perfil, registro y login.",
    "github": "[https://github.com/fedeheinrich](https://github.com/fedeheinrich)",
    "imagen": "[https://avatars.githubusercontent.com/u/9919?v=4](https://avatars.githubusercontent.com/u/9919?v=4)"
  }
]
```

## 🚀 Deploys
| Componente | Servicio | URL |
| :--- | :--- | :--- |
| **Frontend** | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white) | [Ver Sitio](https://oviedo-matias.github.io/ProgramacionIII-Practico-3-Fork-1/) |
| **API / Backend** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) | [Ver Sitio](https://impulsar-webapi-64jf.onrender.com) |
