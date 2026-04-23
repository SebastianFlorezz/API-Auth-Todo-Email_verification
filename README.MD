# Todo List API

RESTful API para autenticación de usuarios y gestión de tareas, construida con Node.js, Express y Prisma ORM.

## Tecnologías

- **Node.js** + **Express** – Servidor y manejo de rutas
- **Prisma ORM** – Acceso y gestión de base de datos
- **JWT** – Autenticación mediante tokens
- **Mailtrap** – Envío de emails para verificación de cuenta

##  Funcionalidades

- Registro e inicio de sesión de usuarios
- Verificación de email vía Mailtrap
- Autenticación con JWT (expira en 7 días)
- CRUD completo de tareas por usuario autenticado
- Respuestas siguiendo el estándar JSON:API

##  Instalación

```bash
git clone https://github.com/SebastianFlorezz/API-Auth-Todo-Email_verification
npm install
```

Configura las variables de entorno en un archivo `.env`:

```env
PORT=5000
DATABASE_URL=""
JWT_SECRET=""
JWT_EXPIRES_IN="7d"
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=xxxxxxxxxxxxxx
MAILTRAP_PASS=xxxxxxxxxxxxxx
MAIL_FROM=no-reply@example.local
BASE_URL=http://localhost:5000
```

Ejecuta las migraciones de Prisma:

```bash
npx prisma migrate dev
```

Inicia el servidor:

```bash
npm run dev
```

El servidor corre en `http://localhost:5000`.

---

##  Endpoints

### Auth

#### `POST /users/register` – Registrar usuario

**Body:**
```json
{
  "username": "juanperez",
  "email": "juan@email.com",
  "password": "mypassword123"
}
```

**Respuesta `201`:**
```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "username": "juanperez",
      "email": "juan@email.com",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "links": { "self": "/api/users/1" }
  },
  "meta": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

| Código | Descripción |
|--------|-------------|
| `201` | Usuario registrado exitosamente |
| `400` | Campos requeridos faltantes |
| `409` | El usuario o email ya existe |
| `422` | Error de validación |

---

#### `POST /users/login` – Iniciar sesión

**Body:**
```json
{
  "email": "juan@email.com",
  "password": "mypassword123"
}
```

**Respuesta `200`:** misma estructura que `/register`.

| Código | Descripción |
|--------|-------------|
| `200` | Login exitoso |
| `400` | Campos requeridos faltantes |
| `401` | Credenciales inválidas |
| `422` | Error de validación |

---

###  Tasks

> Todos los endpoints de tareas requieren el header:
> `Authorization: Bearer <token>`

---

#### `POST /tasks/create` – Crear tarea

**Body:**
```json
{
  "title": "Comprar leche",
  "description": "Ir al supermercado"
}
```

**Respuesta `201`:**
```json
{
  "data": {
    "type": "tasks",
    "id": "1",
    "attributes": {
      "title": "Comprar leche",
      "description": "Ir al supermercado",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "relationships": {
      "user": {
        "data": { "type": "users", "id": "1" },
        "links": { "related": "/api/users/1" }
      }
    },
    "links": { "self": "/api/tasks/1" }
  }
}
```

| Código | Descripción |
|--------|-------------|
| `201` | Tarea creada exitosamente |
| `400` | Campos requeridos faltantes |
| `401` | Token inválido o ausente |
| `422` | Error de validación |

---

#### `PUT /tasks/put/:id` – Actualizar tarea

**Params:** `id` – ID de la tarea  
**Body:**
```json
{
  "title": "Comprar leche y pan",
  "description": "Ir al supermercado"
}
```

**Respuesta `200`:** misma estructura que `/tasks/create`.

| Código | Descripción |
|--------|-------------|
| `200` | Tarea actualizada exitosamente |
| `401` | No autenticado |
| `403` | Sin permisos sobre esta tarea |
| `404` | Tarea no encontrada |

---

#### `DELETE /tasks/delete/:id` – Eliminar tarea

**Params:** `id` – ID de la tarea

**Respuesta `200`:**
```json
{
  "data": {
    "message": "Task deleted successfully"
  }
}
```

| Código | Descripción |
|--------|-------------|
| `200` | Tarea eliminada exitosamente |
| `401` | No autenticado |
| `403` | Sin permisos sobre esta tarea |
| `404` | Tarea no encontrada |

---

##  Autenticación

La API usa **JWT Bearer Token**. Después de registrarte o iniciar sesión, incluye el token en todas las peticiones protegidas: