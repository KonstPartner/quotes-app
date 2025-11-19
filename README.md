# Quotes App

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Development

To start the development server:

```bash
npm run dev
```

---

## Production

Create a production build:

```bash
npm run build
```

Start application:

```bash
npm run start
```

---

## Start local API (json-server)

> Local quotes are stored in `db.json`.

Run json-server:

```bash
npm run api
```

> Local API is **available only in local development or production mode**.
> In deployments (e.g., GitHub Pages), this feature is not working.

---

## Notes

> Authentication in this app is **implemented purely on the client**, using json-server as a mock backend.
> Passwords are hashed on the client side only to avoid storing plain-text passwords in db.json,
