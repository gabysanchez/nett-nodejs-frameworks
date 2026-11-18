# NETT Node.js Frameworks

Repositorio de prácticas para construir APIs HTTP con TypeScript. El curso empieza con Node.js y su módulo `node:http`, y continúa con Express y NestJS. La API de eventos sirve como ejemplo común para comparar cómo se organizan el servidor, las rutas y la validación en cada etapa.

## Estructura

~~~text
nett-nodejs-frameworks/
├── 01-nodejs/
│   ├── class-01/
│   └── class-02/
├── 02-express/
├── 03-nestjs/
└── bruno/
    ├── Events/
    └── environments/
~~~

| Carpeta | Qué encontrarás |
| --- | --- |
| [`01-nodejs/class-01`](01-nodejs/class-01/README.md) | Un primer servidor HTTP con rutas para listar, filtrar y eliminar eventos. En `challenges/` hay ejercicios de JavaScript y TypeScript sobre referencias, el bucle de eventos, asincronía y búsqueda en arrays. |
| [`01-nodejs/class-02`](01-nodejs/class-02/README.md) | Una API con el código separado en módulos para las rutas, los datos, la validación y las utilidades HTTP. Añade consultas por ID, creación y reemplazo de eventos. |
| [`02-express/`](02-express/) | Espacio reservado para las prácticas con Express. |
| [`03-nestjs/`](03-nestjs/) | Espacio reservado para las prácticas con NestJS. |
| [`bruno/`](bruno/) | Colección de peticiones HTTP compartida por las prácticas. |

## Arrancar una práctica

Las prácticas de Node.js requieren Node.js 22.16.0 o superior. Entra en la carpeta de la clase, ejecuta `npm install` y sigue el comando de arranque de su README. Usa `npm start` para la Clase 01 y `npm run dev` para la Clase 02.

## Probar la API con Bruno

La colección **NETT Events API** reúne en **Events** las peticiones para listar, filtrar, consultar, crear, reemplazar, actualizar y eliminar eventos. Cada práctica implementa las operaciones de su etapa. Puedes empezar con **List Events** en ambas clases de Node.js.

1. Abre la carpeta [`bruno/`](bruno/) desde **Open Collection** en Bruno y selecciona **Local**.
2. Arranca la práctica y ajusta `baseUrl` al puerto del servidor. Para la Clase 01 usa `http://localhost:3000`. En la Clase 02, usa `http://localhost:3001` si el `.env` tiene `PORT=3001`, o el puerto 3000 si no se ha definido `PORT`.
3. Para probar una operación sobre un evento concreto, pon su identificador en `eventId`. Puedes obtenerlo con **List Events** o de la respuesta de **Create Event** en las prácticas que permiten crearlos.
