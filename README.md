# Quotes App

This is a **full-featured SPA** built with **React + TypeScript**.
It allows users to explore quotes, manage their own content, read posts from a **GraphQL API**, and interact through a real-time **WebSocket chat**.
The application is **fully responsive**, supports **theme switching**, and follows a clean, modern UI style.

Live Demo: https://konstpartner.github.io/quotes-app/

---

## Features

- **Fully responsive** single-page application built with **React + TypeScript**.

- Modern UI styling using **Tailwind CSS and shadcn/ui** components.

- Client-side routing powered by **TanStack Router**.

- API integration using **TanStack Query**, including caching and request management.

- User authentication with registration and login flows.

- Create, edit, and delete personal quotes.

- View quotes from other users and well-known authors.

- **GraphQL** posts page implemented with **Apollo Client**.

- Real-time echo chat using **WebSocket**.

- Dark/light theme switching.

- Comprehensive test suite with **Jest**: unit tests, integration tests, and snapshots.

- Deployment configured for GitHub Pages.

---

## Core Dependencies

### **Frontend Framework**

- **React 19** — the main UI library
- **React DOM** — DOM rendering

### **Routing**

- **TanStack Router** — client-side routing (SPA)
- **TanStack Router Devtools** — debugging tools

### **Data Fetching & State**

- **TanStack Query** — server state management + caching
- **Apollo Client 4** — GraphQL API layer
- **React Hook Form** — form management and validation

### **UI & Styling**

- **Tailwind CSS** — utility-first styling
- **shadcn/ui (Radix primitives + utilities)** — accessible UI components
- **class-variance-authority** & **tailwind-merge** — component styling helpers
- **Lucide React** — icon set

### **GraphQL**

- **graphql** — schema & query utilities

### **Build System**

- **Vite 7** — fast bundler & dev server
- **@vitejs/plugin-react** — React integration

### **Testing**

- **Jest**
- **React Testing Library**
- **User Event**
- **Jest DOM**, **jsdom environment**

### **Development Tools**

- **ESLint** + plugins
- **Prettier** + Tailwind plugin
- **Husky** & **lint-staged** — git hooks
- **TypeScript**
- **json-server** — mock REST backend for local development

---

## Installation

Install dependencies:

```bash
  npm install
```

### Development

To start the development server:

```bash
  npm run dev
```

### Production

Create a production build:

```bash
  npm run build
```

Start application:

```bash
  npm run start
```

### Start local API (json-server)

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
