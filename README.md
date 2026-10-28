<div align="center">

# Hotel Miranda · API REST

**API en Node.js + Express + TypeScript que da servicio al dashboard de Hotel Miranda: habitaciones, reservas, empleados, mensajes de contacto y login con JWT.**

Proyecto del Training React Full Stack de OXYGEN · Sprint 6, 7, 8 y 9 (Node y Express)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_4-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-2E2E2E?style=flat-square)

[Dashboard que consume esta API](https://github.com/albertocalerocastillo/OXYGEN_HotelMiranda_Dashboard)

</div>

## Qué es

El backend del proyecto Hotel Miranda. Expone los recursos que gestiona el [dashboard de administración](https://github.com/albertocalerocastillo/OXYGEN_HotelMiranda_Dashboard) (React + Redux): el dashboard llama a esta API en `http://localhost:3001` con un token `Bearer` obtenido en `/login`.

El repositorio recoge la evolución de los cuatro sprints de backend, tarea a tarea:

1. **Tarea 1 · `node-rooms-csv/`**: script de Node que lee `rooms.json`, ordena las habitaciones por precio y genera un CSV.
2. **Tarea 2 · `express-app/`**: "hola mundo" con Express.
3. **Tareas 3 a 8**: estructura de controladores, servicios e interfaces, primero con datos JSON (`src/data/`), después con MongoDB/Mongoose (`database.ts`, `src/models/`), validación con Joi, Swagger y tests.
4. **Versión actual**: persistencia en **MySQL** (`db.ts`, pool de `mysql2`) con relación reserva → habitación y un script de seed con datos falsos.

## Funcionalidades

- **CRUD completo** de habitaciones, reservas y empleados; listado y archivado de mensajes de contacto.
- **Relación Booking–Room**: las reservas guardan `roomId`; al listarlas se hace `INNER JOIN` con `rooms`, y al crear o editar una reserva se comprueba que la habitación existe.
- **Login con JWT**: `POST /login` valida contra un usuario de demostración y devuelve un token firmado (caduca en 1 h) y el nombre.
- **Middleware de autenticación** (`src/middleware/auth.ts`): lee `Authorization: Bearer`, verifica el JWT y comprueba en MySQL que el usuario existe.
- **Contraseñas con bcrypt** al crear empleados; la respuesta de creación no devuelve el hash.
- **Validación con Joi** al crear reservas (campos obligatorios y tipos).
- **Valores por defecto** al crear habitaciones (foto, estado `Available`, oferta `NO`...).
- **Documentación OpenAPI 3** con `swagger-jsdoc` + `swagger-ui-express`, servida en `/api-docs`.
- **Seed** (`seed.ts`) que rellena usuarios, contactos, habitaciones y reservas con `@faker-js/faker`.
- **CORS** habilitado para el front.

## Stack

| Capa | Tecnología |
| --- | --- |
| Runtime y framework | Node.js, Express 4, TypeScript 5 |
| Base de datos | MySQL con `mysql2/promise` (versión actual) · MongoDB con Mongoose (iteración anterior) |
| Autenticación | `jsonwebtoken`, `bcrypt` |
| Validación | Joi |
| Documentación | swagger-jsdoc, swagger-ui-express |
| Datos de prueba | @faker-js/faker, uuid |
| Testing | Jest, Supertest |
| Desarrollo | nodemon, ts-node, dotenv |

## Arquitectura / estructura de carpetas

Arquitectura por capas: **controlador** (rutas de Express + manejo de errores HTTP) → **servicio** (SQL contra el pool) → **base de datos**.

```text
src/
├── app.ts            # Express, Swagger, CORS, montaje de rutas y arranque
├── controllers/      # Rooms, Bookings, Contact, User, Login (Router + anotaciones @swagger)
├── services/         # RoomService, BookingService, UserService, ContactService, AuthService
├── middleware/       # auth.ts: verificación de JWT
├── validators/       # Esquemas Joi
├── interfaces/       # Tipos de dominio
├── models/           # Esquemas Mongoose (iteración MongoDB)
├── data/             # JSON de la primera iteración
└── test/RoomsTest.ts # Tests de integración con Supertest
db.ts                 # Pool MySQL
database.ts           # Conexión Mongoose (iteración anterior)
seed.ts               # Datos falsos con Faker
node-rooms-csv/       # Tarea 1
express-app/          # Tarea 2
```

## API

Base local: `http://localhost:3001`. Documentación interactiva: **`/api-docs`** (Swagger UI).

| Método | Ruta | Descripción | Auth |
| --- | --- | --- | --- |
| `GET` | `/` | Nombre del hotel y lista de endpoints | No |
| `POST` | `/login` | Recibe `{ email, password }` y devuelve `{ token, name }` | No |
| `GET` | `/rooms` | Lista todas las habitaciones | Bearer* |
| `GET` | `/rooms/:id` | Detalle de una habitación (404 si no existe) | Bearer* |
| `POST` | `/rooms` | Crea una habitación (rellena valores por defecto) | Bearer* |
| `PUT` | `/rooms/:id` | Actualiza una habitación | Bearer* |
| `DELETE` | `/rooms/:id` | Elimina una habitación | Bearer* |
| `GET` | `/bookings` | Lista reservas con datos de su habitación (JOIN) | Bearer* |
| `GET` | `/bookings/:id` | Detalle de una reserva | Bearer* |
| `POST` | `/bookings` | Crea una reserva (Joi + comprueba la habitación) | Bearer* |
| `PUT` | `/bookings/:id` | Actualiza una reserva | Bearer* |
| `DELETE` | `/bookings/:id` | Elimina una reserva | Bearer* |
| `GET` | `/users` | Lista empleados | Bearer* |
| `GET` | `/users/:id` | Detalle de un empleado | Bearer* |
| `POST` | `/users` | Crea un empleado (contraseña con bcrypt) | Bearer* |
| `PUT` | `/users/:id` | Actualiza un empleado | Bearer* |
| `DELETE` | `/users/:id` | Elimina un empleado | Bearer* |
| `GET` | `/contacts` | Lista mensajes de contacto | Bearer* |
| `PUT` | `/contacts/:id/archive?archived=true\|false` | Archiva o desarchiva un mensaje | Bearer* |

\* Rutas marcadas como privadas en el diseño de la API y el dashboard envía siempre el token, pero `authMiddleware` aún no está montado sobre los routers en `app.ts` (ver [Estado del proyecto](#estado-del-proyecto)).

## Testing

`src/test/RoomsTest.ts` contiene tests de integración con **Supertest** sobre la app de Express para el recurso `/rooms`:

- `GET /rooms` devuelve 200 y un array;
- `GET /rooms/:id` devuelve la habitación o 404 con `"Habitación no encontrada"`;
- `POST /rooms` crea (201) y rechaza un cuerpo inválido (400);
- `PUT /rooms/:id` actualiza (200) y rechaza un cuerpo inválido (400);
- `DELETE /rooms/:id` elimina (200).

```bash
npm test
```

> La suite se escribió en la iteración MongoDB (usa `RoomModel` para limpiar datos) y el archivo no sigue el patrón `*.test.ts` que Jest busca por defecto, ni hay transformador de TypeScript configurado. Para ejecutarla hay que añadir `ts-jest` (o similar) y ajustar `testMatch` o renombrarla.

## Puesta en marcha

Requisitos: Node.js 20 y un servidor MySQL con las tablas `rooms`, `bookings`, `users` y `contacts`.

```bash
git clone https://github.com/albertocalerocastillo/OXYGEN_HotelMiranda_REST.git
cd OXYGEN_HotelMiranda_REST
npm install
# crea un .env con las variables de abajo
npm run dev
npx ts-node seed.ts   # opcional: datos de prueba
```

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Arranca con nodemon + ts-node (`src/app.ts`) |
| `npm run debug` | Igual, con el inspector de Node activado |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta la build (`dist/src/app.js`) |
| `npm test` | Lanza Jest |

**Variables de entorno** (`.env`, ignorado por git):

| Variable | Uso |
| --- | --- |
| `PORT` | Puerto HTTP (por defecto 3001) |
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE` | Conexión MySQL |
| `JWT_SECRET` | Firma y verificación de tokens |
| `MONGODB_URI` | Solo para la iteración MongoDB (`database.ts`) |

**Acceso de demostración**: `POST /login` acepta el usuario ficticio del proyecto, el mismo que muestra la pantalla de login del dashboard.

## Despliegue

El repositorio no incluye pipeline de despliegue: se ejecuta en local con `npm run dev`, o compilando con `npm run build` y lanzando `npm start` en cualquier servidor Node con acceso a MySQL.

## Estado del proyecto

Puntos conocidos, pendientes de cerrar:

- `authMiddleware` está implementado pero no aplicado a `/rooms`, `/bookings`, `/users` ni `/contacts`.
- La configuración de Swagger apunta a nombres de archivo antiguos (`rooms.controller.ts`...), así que `/api-docs` carga la interfaz pero no las rutas anotadas en los controladores actuales.
- El login compara con un usuario de demostración fijo en lugar de consultar la tabla `users`.
- La suite de tests necesita la configuración de Jest para TypeScript descrita arriba.

## Qué aprendí

- Estructurar una API Express por capas (rutas/controladores, servicios, validadores, interfaces) y centralizar el manejo de errores HTTP.
- Migrar la capa de persistencia de ficheros JSON a MongoDB con Mongoose y, después, a MySQL con consultas parametrizadas y relaciones con `JOIN`.
- Autenticar con JWT y middleware de Express, y almacenar contraseñas con bcrypt.
- Documentar una API con OpenAPI desde comentarios JSDoc y probar endpoints de punta a punta con Supertest.
- Generar datos realistas con Faker para poder desarrollar el front contra una base de datos poblada.

---

<div align="center">

**Proyecto relacionado**: [Hotel Miranda · Dashboard](https://github.com/albertocalerocastillo/OXYGEN_HotelMiranda_Dashboard), el panel en React + Redux que consume esta API.

Hecho por [Alberto Calero](https://github.com/albertocalerocastillo) durante el Training React Full Stack de OXYGEN.

</div>
