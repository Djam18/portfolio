---
title: "6 errores comunes en una API (y cómo corregirlos)"
description: "Desde métodos HTTP incorrectos hasta fugas de datos sensibles — los errores que la mayoría de los desarrolladores cometen al construir su primera API, con correcciones concretas."
date: "2026-06-04"
tags: ["api", "backend", "rest", "buenas-practicas"]
author: "Adam Abdel-Djamal"
readingTime: 6
---

Construir una API parece sencillo hasta el primer incidente en producción. La mayoría de los bugs no son complejos — son los mismos seis errores repetidos en miles de codebases. Aquí están, con las correcciones concretas.

---

## 1. Usar el método HTTP incorrecto

El error más visible: usar `GET` para eliminar un recurso, o `POST` para todo porque "funciona".

```http
# ❌ Eliminar con GET — catastrófico si un navegador precarga esta URL
GET /api/usuarios/42/eliminar

# ✅ Correcto
DELETE /api/usuarios/42
```

Los métodos HTTP tienen un significado semántico del que dependen los clientes, proxies y cachés. `GET` debe ser idempotente y seguro (sin efectos secundarios). `POST` crea. `PUT`/`PATCH` actualizan. `DELETE` elimina. Violar estas convenciones rompe el caché, el historial del navegador y todo cliente HTTP que siga la especificación.

---

## 2. Códigos de estado incorrectos

Devolver `200 OK` para una respuesta de error es el error más común en APIs de nivel básico.

```json
// ❌ Estado 200, pero es un error
{
  "success": false,
  "error": "Usuario no encontrado"
}

// ✅ Estado 404 — el cliente lo sabe inmediatamente sin parsear el cuerpo
{
  "error": "Usuario no encontrado",
  "code": "USER_NOT_FOUND"
}
```

**Los códigos más importantes:**

| Código | Cuándo usarlo |
|--------|---------------|
| `200` | Éxito con cuerpo |
| `201` | Recurso creado (POST) |
| `204` | Éxito, sin cuerpo (DELETE) |
| `400` | Entrada inválida del cliente |
| `401` | No autenticado |
| `403` | Autenticado pero no autorizado |
| `404` | El recurso no existe |
| `422` | Entrada sintácticamente válida pero semánticamente incorrecta |
| `429` | Límite de tasa superado |
| `500` | Error del servidor (nunca culpa del cliente) |

---

## 3. Confiar en la entrada del cliente

Cada valor enviado por un cliente es un vector de ataque potencial.

```php
// ❌ Nunca hacer esto
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $id";
// Inyección SQL: ?id=1 OR 1=1

// ✅ Siempre validar y sanear
$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if (!$id) {
    return response()->json(['error' => 'ID inválido'], 400);
}
$user = User::findOrFail($id); // consulta parametrizada
```

Validar: tipo, formato, longitud, rango. Sanear antes de cualquier operación en la base de datos o el sistema de archivos. Nunca confiar en lo que llega en el cuerpo de la solicitud, los encabezados o la cadena de consulta.

---

## 4. Filtrar datos sensibles

Devolver el objeto completo de la base de datos sin filtrar es una invitación a una brecha de datos.

```json
// ❌ Devolver el modelo User completo
{
  "id": 42,
  "email": "user@example.com",
  "password": "$2b$12$...",
  "stripe_customer_id": "cus_xxx",
  "notas_internas": "marcado para revisión",
  "created_at": "2024-01-01"
}

// ✅ Devolver solo lo que el cliente realmente necesita
{
  "id": 42,
  "email": "user@example.com",
  "created_at": "2024-01-01"
}
```

Usar serializers, DTOs o API Resources (Laravel) para definir explícitamente qué se expone. La regla: **opt-in, no opt-out.** Empezar con nada, añadir lo necesario.

---

## 5. Formato de error inconsistente

Cuando cada endpoint devuelve errores de forma diferente, cada cliente tiene que manejar cada formato.

```json
// ❌ Endpoint A
{ "message": "No encontrado" }

// ❌ Endpoint B
{ "error": true, "msg": "Validación fallida", "campos": ["email"] }

// ❌ Endpoint C
"Error interno del servidor"

// ✅ Un formato, en todas partes
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "La solicitud contiene campos inválidos.",
    "details": [
      { "field": "email", "issue": "Formato de email inválido" }
    ]
  }
}
```

Definir el envelope de error una vez. Aplicarlo en todas partes mediante un manejador global de excepciones. Los clientes — incluido el propio frontend — lo agradecerán.

---

## 6. Sin versionado de API

Cambiar la respuesta de un endpoint rompe todos los clientes que lo usan. Sin versionado, la API nunca puede evolucionar.

```http
# ❌ Sin versión — cualquier cambio incompatible afecta a todos los clientes inmediatamente
GET /api/usuarios

# ✅ Versionado — v1 se mantiene estable, v2 introduce cambios incompatibles de forma segura
GET /api/v1/usuarios
GET /api/v2/usuarios
```

Versionar desde el primer día, aunque solo exista v1. El coste de añadir `/v1/` después — cuando los clientes ya están en producción — es mucho mayor que el coste de incluirlo desde el principio.

---

## La conclusión

Ninguno de estos errores requiere conocimientos avanzados para corregirse. Requieren disciplina: una lista de verificación antes de que cada endpoint se entregue.

- [ ] El método HTTP corresponde a la semántica de la operación
- [ ] El código de estado es preciso
- [ ] Todas las entradas se validan antes de usarse
- [ ] La respuesta solo expone los campos necesarios
- [ ] Los errores siguen el formato global
- [ ] La URL incluye una versión de API
