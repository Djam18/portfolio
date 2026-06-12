---
title: "6 häufige API-Fehler (und wie man sie behebt)"
description: "Von falschen HTTP-Methoden bis zu Datenlecks — die Fehler, die die meisten Entwickler beim Erstellen ihrer ersten API machen, mit konkreten Korrekturen."
date: "2026-06-04"
tags: ["api", "backend", "rest", "best-practices"]
author: "Adam Abdel-Djamal"
readingTime: 6
---

Eine API zu bauen klingt einfach — bis zum ersten Produktionsvorfall. Die meisten Bugs sind nicht komplex. Es sind dieselben sechs Fehler, die sich in tausenden von Codebasen wiederholen. Hier sind sie, mit den konkreten Korrekturen.

---

## 1. Falsche HTTP-Methode verwenden

Der sichtbarste Fehler: `GET` zum Löschen einer Ressource verwenden oder `POST` für alles, weil "es funktioniert".

```http
# ❌ Löschen mit GET — katastrophal, wenn ein Browser diese URL vorab lädt
GET /api/benutzer/42/loeschen

# ✅ Korrekt
DELETE /api/benutzer/42
```

HTTP-Methoden tragen eine semantische Bedeutung, von der Clients, Proxies und Caches abhängen. `GET` muss idempotent und sicher sein (keine Seiteneffekte). `POST` erstellt. `PUT`/`PATCH` aktualisieren. `DELETE` entfernt. Das Verletzen dieser Konventionen bricht Caching, den Browser-Verlauf und jeden HTTP-Client, der die Spezifikation befolgt.

---

## 2. Falsche Status-Codes

`200 OK` für eine Fehlerantwort zurückzugeben ist der häufigste Fehler in Junior-APIs.

```json
// ❌ Status 200, aber es ist ein Fehler
{
  "success": false,
  "error": "Benutzer nicht gefunden"
}

// ✅ Status 404 — der Client weiß es sofort, ohne den Body zu parsen
{
  "error": "Benutzer nicht gefunden",
  "code": "USER_NOT_FOUND"
}
```

**Die wichtigsten Status-Codes:**

| Code | Wann verwenden |
|------|----------------|
| `200` | Erfolg mit Body |
| `201` | Ressource erstellt (POST) |
| `204` | Erfolg, kein Body (DELETE) |
| `400` | Ungültige Eingabe vom Client |
| `401` | Nicht authentifiziert |
| `403` | Authentifiziert, aber nicht autorisiert |
| `404` | Ressource existiert nicht |
| `422` | Syntaktisch gültig, aber semantisch falsch |
| `429` | Rate Limit überschritten |
| `500` | Serverfehler (nie die Schuld des Clients) |

---

## 3. Client-Eingaben vertrauen

Jeder vom Client gesendete Wert ist ein potenzieller Angriffsvektor.

```php
// ❌ Das niemals tun
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $id";
// SQL-Injection: ?id=1 OR 1=1

// ✅ Immer validieren und bereinigen
$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if (!$id) {
    return response()->json(['error' => 'Ungültige ID'], 400);
}
$user = User::findOrFail($id); // parametrisierte Abfrage
```

Validieren: Typ, Format, Länge, Bereich. Bereinigen vor jeder Datenbank- oder Dateisystemoperation. Niemals dem vertrauen, was im Request-Body, den Headers oder dem Query-String ankommt.

---

## 4. Sensible Daten preisgeben

Das rohe Datenbankobjekt ohne Filterung zurückzugeben ist eine Einladung zu einer Datenpanne.

```json
// ❌ Das rohe User-Modell zurückgeben
{
  "id": 42,
  "email": "user@example.com",
  "password": "$2b$12$...",
  "stripe_customer_id": "cus_xxx",
  "interne_notizen": "zur Überprüfung markiert",
  "created_at": "2024-01-01"
}

// ✅ Nur zurückgeben, was der Client wirklich braucht
{
  "id": 42,
  "email": "user@example.com",
  "created_at": "2024-01-01"
}
```

Serializer, DTOs oder API Resources (Laravel) verwenden, um explizit zu definieren, was exponiert wird. Die Regel: **Opt-in, nicht Opt-out.** Mit nichts anfangen, nur das Notwendige hinzufügen.

---

## 5. Inkonsistentes Fehlerformat

Wenn jeder Endpoint Fehler anders zurückgibt, muss jeder Client jedes Format verarbeiten.

```json
// ❌ Endpoint A
{ "message": "Nicht gefunden" }

// ❌ Endpoint B
{ "error": true, "msg": "Validierung fehlgeschlagen", "felder": ["email"] }

// ❌ Endpoint C
"Interner Serverfehler"

// ✅ Ein Format, überall
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Die Anfrage enthält ungültige Felder.",
    "details": [
      { "field": "email", "issue": "Ungültiges E-Mail-Format" }
    ]
  }
}
```

Den Error-Envelope einmal definieren. Überall über einen globalen Exception-Handler anwenden. Clients — einschließlich des eigenen Frontends — werden es danken.

---

## 6. Kein API-Versioning

Das Ändern einer Endpoint-Antwort bricht jeden Client, der sie verwendet. Ohne Versioning kann sich die API nie weiterentwickeln.

```http
# ❌ Keine Version — jede Breaking Change betrifft sofort alle Clients
GET /api/benutzer

# ✅ Versioniert — v1 bleibt stabil, v2 führt Breaking Changes sicher ein
GET /api/v1/benutzer
GET /api/v2/benutzer
```

Von Anfang an versionieren, auch wenn es nur v1 gibt. Die Kosten, `/v1/` später hinzuzufügen — nachdem Clients in Produktion sind — sind viel höher als die Kosten, es von Anfang an einzuschließen.

---

## Das Fazit

Keiner dieser Fehler erfordert fortgeschrittene Kenntnisse zur Behebung. Es erfordert Disziplin: eine Checkliste, bevor jeder Endpoint ausgeliefert wird.

- [ ] HTTP-Methode entspricht der Semantik der Operation
- [ ] Status-Code ist korrekt
- [ ] Alle Eingaben werden vor der Verwendung validiert
- [ ] Response exponiert nur notwendige Felder
- [ ] Fehler folgen dem globalen Format
- [ ] URL enthält eine API-Version
