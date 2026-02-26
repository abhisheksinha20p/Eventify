# Eventify – Technical Stack & Architecture Document

## 1. Purpose of This Document

This document defines the **complete technical stack**, architectural choices, and tooling used to build **Eventify**, a full-stack mobile application based on a **microservices architecture**. It complements the PRD and serves as a reference for developers, reviewers, and interviewers.

---

## 2. High-Level Architecture Overview

Eventify follows a **client–gateway–microservices** model.

```
Mobile App (Expo)
   ↓
API Gateway
   ↓
Microservices (Auth, Event, Booking, Payment, etc.)
   ↓
Independent Databases per Service
```

Key principles:
- Loose coupling between services
- Independent scaling
- Clear ownership of data
- Secure, role-based access

---

## 3. Frontend (Mobile Application)

### 3.1 Framework & Language
- **React Native (Expo)** – Cross-platform mobile development
- **TypeScript** – Type safety and maintainability

### 3.2 UI & Styling
- **NativeWind (Tailwind CSS)** – Utility-first styling
- **Expo Vector Icons** – Iconography

### 3.3 Navigation
- **React Navigation**
  - Stack Navigator (auth, flows)
  - Bottom Tabs (main app)

### 3.4 State Management
- **Zustand**
  - Auth state
  - Event discovery state
  - Booking & QR state
  - UI/loading state

### 3.5 Networking
- **Axios**
  - Centralized API client
  - Token injection via interceptors
  - Error handling

### 3.6 Device Capabilities
- **Expo Camera** – QR scanning
- **Expo Location** – Location-based event discovery
- **Expo Notifications** – Push notifications
- **Secure Store** – Token storage

---

## 4. Backend Architecture

### 4.1 API Gateway

**Purpose:**
- Single entry point for mobile app
- Authentication & token validation
- Request routing to services
- Rate limiting

**Tech Stack:**
- Node.js
- Express / Fastify
- JWT validation middleware

---

## 5. Microservices Stack

Each microservice is independently deployable and owns its database.

### 5.1 Auth Service
- **Node.js + TypeScript**
- **Firebase Auth** or **Custom JWT Auth**
- Email verification
- Role assignment

### 5.2 User Service
- Profile management
- Organizer metadata
- Session isolation

**Database:** MongoDB

---

### 5.3 Event Service
- Paid & unpaid event creation
- Location-based visibility logic
- Event code generation
- Slot & capacity handling

**Database:** MongoDB

---

### 5.4 Booking Service
- Slot booking
- Booking lifecycle
- Automatic approval (paid events)

**Database:** MongoDB

---

### 5.5 Payment Service
- **Stripe API**
- Payment Intent creation
- Webhook verification
- Payment confirmation

**Database:** PostgreSQL (for transactional integrity)

---

### 5.6 Approval Service
- Manual approval/rejection (unpaid events)
- Approval audit logs

**Database:** MongoDB

---

### 5.7 QR & Entry Service
- QR code generation
- QR validation
- Single-use enforcement
- Entry logs

**Database:** Redis + MongoDB

---

### 5.8 Notification Service
- Push notifications
- Email notifications

**Tech:**
- Expo Push Service
- Firebase Cloud Messaging (optional)

---

## 6. Inter-Service Communication

- **REST APIs** (synchronous)
- **Webhooks** (Stripe → Payment Service)
- **Event-driven triggers** (optional)

All communication secured using:
- Internal service tokens
- HTTPS

---

## 7. Data Isolation Strategy

- One database per microservice
- No cross-service DB access
- Communication only via APIs
- Clear ownership of schemas

---

## 8. Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Organizer-only routes protected
- Attendee-only flows restricted

---

## 9. Infrastructure & DevOps

### 9.1 Containerization
- **Docker** – Each microservice

### 9.2 Orchestration (Optional)
- **Docker Compose** (local)
- **Kubernetes** (production-ready)

### 9.3 Deployment
- Mobile App: Expo EAS
- Backend: AWS / GCP / Render

---

## 10. Observability & Monitoring

- Centralized logging
- Health check endpoints
- Error tracking (Sentry optional)

---

## 11. Security Considerations

- HTTPS everywhere
- Secure token storage
- Stripe webhook signature verification
- Rate limiting at gateway

---

## 12. Scalability Considerations

- Independent service scaling
- Horizontal scaling support
- Stateless services

---

## 13. Summary

Eventify uses a **modern, scalable tech stack** combining **React Native (Expo)** on the frontend with a **Node.js microservices backend**, Stripe-powered payments, QR-based entry validation, and strict data isolation. The architecture is production-ready and demonstrates strong full-stack and system design capabilities.