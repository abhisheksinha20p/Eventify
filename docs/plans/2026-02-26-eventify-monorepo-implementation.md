# Eventify Monorepo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish a flat monorepo structure for the Eventify Web App, including frontend (Vite), microservices (Node.js), and Docker orchestration.

**Architecture:** Flat Monorepo (Option 3) with independent services and a central API Gateway. Services are containerized using Docker.

**Tech Stack:** React, Vite, Node.js, Express, MongoDB, PostgreSQL, Redis, Docker Compose.

---

### Task 1: Repository Initialization
**Files:**
- Create: `.gitignore`
- Create: `package.json` (Root)

**Step 1: Clone Repository**
Run: `git clone https://github.com/abhisheksinha20p/Eventify.git .` in `d:\stitch` (or copy if already exists).

**Step 2: Create Folder Skeleton**
Run: `mkdir apps services shared`

**Step 3: Create Service Folders**
Run: `mkdir services/gateway services/auth-service services/user-service services/event-service services/booking-service services/payment-service services/approval-service services/qr-service services/notification-service`

**Step 4: Commit Skeleton**
Run: `git add . && git commit -m "chore: initial monorepo skeleton"`

---

### Task 2: Web App Initialization (Vite)
**Files:**
- Create: `apps/web/`

**Step 1: Scaffolding**
Run: `npm create vite@latest apps/web -- --template react-ts`

**Step 2: Install dependencies**
Run: `cd apps/web && npm install`

**Step 3: Verify**
Run: `npm run dev` (Capture check)

**Step 4: Commit**
Run: `git add . && git commit -m "feat: initialize web app with vite"`

---

### Task 3: API Gateway Setup
**Files:**
- Create: `services/gateway/package.json`
- Create: `services/gateway/index.ts`
- Create: `services/gateway/Dockerfile`

**Step 1: Initialization**
Create `services/gateway/package.json` with Express dependencies.

**Step 2: Implement Health Check**
Create `services/gateway/index.ts` with a simple `/health` route.

**Step 3: Commit**
Run: `git add . && git commit -m "feat: add api gateway skeleton"`

---

### Task 4: Docker Compose Configuration
**Files:**
- Create: `docker-compose.yml`

**Step 1: Define Databases**
Add MongoDB, PostgreSQL, and Redis to `docker-compose.yml`.

**Step 2: Define Services**
Add Gateway and placeholders for other services.

**Step 3: Verify Stack**
Run: `docker compose up -d`
Check: `docker ps`

**Step 4: Commit**
Run: `git add . && git commit -m "chore: add docker-compose orchestration"`
