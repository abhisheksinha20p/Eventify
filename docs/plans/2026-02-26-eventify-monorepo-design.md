# 2026-02-26-Eventify-Monorepo-Design

## Overview
This design defines the initial monorepo structure for **Eventify**, a microservices-based web application for event management. The system will be organized as a "Flat Monorepo" to maintain simplicity while allowing independent scaling of services.

## Architecture
- **Monorepo Strategy**: Option 3 (Flat Folders)
- **Frontend**: React + TypeScript (Vite)
- **Backend Services**: Node.js + Express/Fastify
- **Database**: 
  - MongoDB (Auth, User, Event, Booking, Approval, Notification, QR)
  - PostgreSQL (Payment)
  - Redis (QR Caching)
- **Deployment/Local Dev**: Docker Compose

## Directory Structure
```text
Eventify/
├── apps/
│   └── web/                # Vite + React + TypeScript
├── services/
│   ├── gateway/            # API Gateway & Auth Middleware
│   ├── auth-service/       # Identity Management
│   ├── user-service/       # Profile management
│   ├── event-service/      # Event CRUD & logic
│   ├── booking-service/    # Ticket reservations
│   ├── payment-service/    # Stripe integration
│   ├── approval-service/   # Manual workflow for private events
│   ├── qr-service/         # QR generation and validation
│   └── notification-service/ # Push & Email
├── shared/                 # Shared types, constants, and schema models
└── docker-compose.yml      # Orchestration
```

## Implementation Phases
1. **Infrastructure**: Clone repository, setup folder skeleton, and root `.gitignore`.
2. **Frontend Initialization**: `npm create vite@latest apps/web -- --template react-ts`.
3. **Gateway & Service Skeletons**: Basic Node.js apps with health checks and Dockerfiles.
4. **Docker Orchestration**: Multi-container setup for local development.

## Success Criteria
- Repo cloned and structure established.
- Web app runs locally via Vite.
- All services start and connect via Docker Compose.
- Inter-service communication via Gateway is verified.
