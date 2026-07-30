# Gadiwalla — Car Dealership Inventory System (TDD Kata)

A full-stack, enterprise-grade Car Dealership Inventory Management platform built using Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, React (Vite), and Tailwind CSS.

---

## 🌐 Live Demo

- **Frontend (Vercel)**: [https://gadiwalla-car-dealership.vercel.app](https://gadiwalla-car-dealership.vercel.app)
- **Backend API (Render)**: Deployed and live!

---

## 🚗 Project Overview

**Gadiwalla** is a modern luxury automotive dealership platform allowing users to browse vehicle inventory, filter by brand, category, price, and year, register/login with JWT authentication, and execute real-time vehicle purchases. Admin users possess full inventory control to add, update, restock, and delete vehicles.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT Authentication, Bcrypt, Jest, Supertest.
- **Frontend**: React 18+, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Axios, Sonner, Vitest, React Testing Library.

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database instance running locally or via cloud (e.g. Supabase / Neon / Render Postgres)

---

### 2. Backend Setup
```bash
cd Backend

# Install dependencies
npm install

# Setup environment variables (.env)
# Create a .env file with DATABASE_URL and JWT_SECRET:
# DATABASE_URL="postgresql://user:password@localhost:5432/gadiwalla_db?schema=public"
# JWT_SECRET="supersecretkey"

# Generate Prisma Client & Migrate Schema
npx prisma db push

# Seed Database (Admin user + 6 luxury cars)
npx prisma db seed

# Run Dev Server (port 3000)
npm run dev

# Run Backend Unit Test Suite (Jest)
npm test
```

---

### 3. Frontend Setup
```bash
cd Frontend

# Install dependencies
npm install

# Setup environment variables (.env)
# VITE_API_BASE_URL="http://localhost:3000/api"

# Run Dev Server (Vite)
npm run dev

# Run Frontend Unit Test Suite (Vitest)
npm run test

# Run Production Build Check
npm run build
```

The application will be accessible at `http://localhost:5173`.

---

## 🔐 Default Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@gadiwalla.com` | `GadiwallaAdmin#2025!` |
| **Customer** | *(Self-register via Sign Up tab)* | *(6+ characters)* |

---

## 📡 API Endpoints Summary

### Authentication
- `POST /api/auth/register` — Register new user (`CUSTOMER` role by default)
- `POST /api/auth/login` — Authenticate and receive JWT token

### Vehicles
- `GET /api/vehicles` — Get all vehicles in inventory
- `GET /api/vehicles/search` — Search vehicles by query or category
- `GET /api/vehicles/:id` — Get single vehicle details
- `POST /api/vehicles` — *(Admin Only)* Create new vehicle record
- `PUT /api/vehicles/:id` — *(Admin Only)* Update vehicle details
- `DELETE /api/vehicles/:id` — *(Admin Only)* Delete vehicle record

### Inventory Control
- `PATCH /api/vehicles/:id/purchase` (or `POST`) — *(Protected)* Purchase vehicle (decrements quantity by 1, sets to SOLD if quantity reaches 0)
- `POST /api/vehicles/:id/restock` — *(Admin Only)* Restock vehicle (increments quantity)

---

## 🧪 Test Suite Summary

### Backend Unit Tests (Jest + Supertest)
- **Test Suites**: 12 passed (100%)
- **Tests**: 31 passed (100%)
- **Coverage Areas**: Auth Registration, Auth Login, JWT Authentication Middleware, Admin Authorization Guard, Create Vehicle, Get Vehicles, Get Vehicle By ID, Update Vehicle, Delete Vehicle, Purchase Vehicle (Stock Decrement & Out of Stock Guards), Restock Vehicle.

### Frontend Unit Tests (Vitest + React Testing Library)
- **Test Suites**: 3 passed (100%)
- **Tests**: 33 passed (100%)
- **Coverage Areas**: Permission Helpers (`isAdmin`, `canCreateVehicle`, `canEditVehicle`, `canDeleteVehicle`), Filter & Search Utilities (`filterVehicles`), Vehicle Service API Client & Data Mapper (`mapBackendToFrontend`, `purchaseVehicle`).

---

## 🤖 My AI Usage

AI tools were used throughout development to accelerate implementation, review code, generate boilerplate, improve testing, refine the UI, and assist with debugging. The overall application architecture, feature planning, implementation decisions, and integration remained under my control.

### AI Tools Used

During development I used the following AI tools:
- **ChatGPT (OpenAI)**
- **Google Gemini (Antigravity)**
- **Claude**
- **GitHub Copilot**
- **Stitch**
- **Impeccable**

---

### How AI Was Used

#### ChatGPT
Used primarily as a technical reviewer and software engineering assistant.
- Reviewed backend and frontend architecture.
- Suggested improvements to project structure and code organization.
- Helped design clean commit history and development workflow.
- Reviewed implementations for maintainability and best practices.
- Generated and refined unit test strategies.
- Assisted with deployment configuration for Render and Vercel.
- Reviewed README and project documentation.

---

#### Google Gemini / Antigravity
Used for core implementation assistance and agentic pairing.
- Generated backend boilerplate and Prisma schema.
- Scaffolded Express REST endpoints with TypeScript.
- Implemented authentication, role authorization, and vehicle CRUD endpoints.
- Generated Jest + Supertest integration tests and Vitest frontend unit tests.
- Assisted with purchase and restock workflows.
- Built responsive React components and Tesla-inspired visual design system.

---

#### Claude
Used as a secondary code review and debugging assistant.
- Compared implementation approaches.
- Reviewed TypeScript logic.
- Suggested improvements for maintainability and edge-case handling.

---

#### GitHub Copilot
Used during development for code completion, small utility functions, interface generation, and repetitive TypeScript boilerplate.

---

#### Stitch & Impeccable
Used during UI development for rapidly prototyping component layouts, exploring visual structures, and refining responsive design ideas before implementation.

---

### Development Workflow

Rather than asking AI to build the application end-to-end, development followed an iterative workflow:
1. Design the feature and define the implementation approach.
2. Use AI to generate boilerplate or repetitive code.
3. Review and understand the generated code.
4. Modify and integrate it into the existing architecture.
5. Write or refine tests.
6. Verify functionality manually and through automated testing.
7. Refactor where necessary.

---

### Reflection

AI significantly improved my development workflow by reducing the time spent writing repetitive boilerplate, scaffolding APIs, creating test cases, debugging issues, and reviewing implementations.

Using multiple AI tools also exposed me to different implementation approaches, allowing me to compare suggestions instead of relying on a single source.

The final project reflects manual integration, testing, debugging, and refinement of AI-generated suggestions rather than directly accepting generated code. Every feature was reviewed, validated, and adapted before being included in the final application.


