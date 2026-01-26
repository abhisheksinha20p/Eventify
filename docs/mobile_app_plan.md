Based on the comprehensive technical documentation provided in the sources, here is a professional, step-by-step **Todo List (.md)** designed to be handed to an AI developer.

It is structured logically from **Infrastructure** $\rightarrow$ **Backend Microservices** $\rightarrow$ **Frontend**, ensuring strict adherence to the defined architecture, schemas, and design specs.

***

# Eventify_Build_Plan.md

## Project Overview
**Goal**: Build "Eventify," a microservices-based mobile event platform (iOS/Android) for Paid (Public) and Unpaid (Private) events.
**Architecture**: Client $\rightarrow$ API Gateway $\rightarrow$ Microservices (Node.js) $\rightarrow$ Isolated Databases.
**Frontend**: React Native (Expo), TypeScript, NativeWind, Zustand.

---

## Phase 1: Infrastructure & Environment Setup
*Strictly follow "Deployment architecture (Gateway + Docker + Cloud).md" and "Technical Stack Document".*

- [x] **Initialize Monorepo/Structure**: Set up the project structure to support multiple microservices and a mobile client.
- [x] **Docker Setup**: Create a `Dockerfile` template for Node.js services (stateless, horizontally scalable).
- [x] **Orchestration**: Create a `docker-compose.yml` for local development that spins up:
    - [x] MongoDB (Shared instance, distinct DB names per service).
    - [x] PostgreSQL (For Payment Service).
    - [x] Redis (For QR Service).
- [x] **API Gateway**: Initialize a Node.js/Express Gateway.
    - [x] Implement request routing to downstream microservices (e.g., `/auth/*` $\rightarrow$ Auth Service).
    - [x] Implement JWT validation (`Authorization: Bearer <token>`) middleware.
    - [x] Implement Rate Limiting.

---

## Phase 2: Core Backend Services (Auth & User)
*Refer to "Database schema per microservice.md" and "Service-wise API contracts (OpenAPI-style).md".*

### 1. Auth Service (MongoDB)
- [x] **Database**: Create `accounts` collection with fields: `email`, `passwordHash`, `role` (ATTENDEE/ORGANIZER), `isVerified`.
- [x] **API Implementation**:
    - [x] `POST /auth/register`: Handle user creation and distinct role assignment.
    - [x] `POST /auth/login`: validate credentials and issue JWT.
    - [x] `POST /auth/verify-email`: Handle verification tokens,.

### 2. User Service (MongoDB)
- [x] **Database**: Create `profiles` collection linked via `accountId` (Ref to Auth). Include `city` (Critical for event visibility) and `avatarUrl`.
- [x] **API Implementation**:
    - [x] `GET /users/me`: Return profile details.
    - [x] `PUT /users/me`: Allow profile updates.

---

## Phase 3: Business Logic Services (Events & Booking)
*Refer to "Database schema per microservice.md" and "Event-driven flow diagram".*

### 3. Event Service (MongoDB)
- [x] **Database**: Create `events` collection.
    - [x] Include fields: `type` (PAID/UNPAID), `eventCode` (unique for unpaid), `location` object.
    - [x] Embed `slots` document: `capacity`, `bookedCount`, `price` (cents).
- [x] **API Implementation**:
    - [x] `POST /events`: Organizer only. Create event.
    - [x] `GET /events/public`: Filter by `city` (Strict visibility rule for paid events),.
    - [x] `GET /events/private/verify`: Validate `eventCode` for private access.

### 4. Booking Service (MongoDB)
- [x] **Database**: Create `bookings` collection.
    - [x] Fields: `userId`, `eventId`, `slotId`, `status` (PENDING_PAYMENT, PENDING_APPROVAL, APPROVED).
- [x] **API Implementation**:
    - [x] `POST /bookings`: Initiate booking.
    - [x] `GET /bookings/my`: List user tickets.
- [x] **Logic**: Ensure booking creation respects `slot.capacity`.

### 5. Approval Service (MongoDB)
- [x] **Database**: Create `decisions` collection for audit logs (`action`: APPROVE/REJECT).
- [x] **API Implementation**:
    - [x] `GET /approvals/{eventId}/applicants`: List pending users for unpaid events.
    - [x] `POST /approvals/{bookingId}/decide`: Organizer manual decision. **Note**: Must trigger QR generation on APPROVE.

---

## Phase 4: High-Integrity Services (Payments & QR)
*Refer to "Event-driven flow diagram (Stripe -> Booking -> QR).md".*

### 6. Payment Service (PostgreSQL)
- [x] **Database**: Create `transactions` table.
    - [x] Columns: `booking_id`, `stripe_intent_id`, `amount`, `status`.
- [x] **Integration**: Implement Stripe SDK.
- [x] **API Implementation**:
    - [x] `POST /payments/create-intent`: Create Stripe PaymentIntent.
    - [x] `POST /payments/webhook`: Listen for `payment_intent.succeeded`.
    - [x] **Webhook Logic**: Verify signature $\rightarrow$ Extract `bookingId` $\rightarrow$ Call Booking Service to mark APPROVED $\rightarrow$ Call QR Service to generate code,.

### 7. QR & Entry Service (Redis + MongoDB)
- [x] **Database**:
    - [x] **Redis**: Cache active codes for fast validation.
    - [x] **MongoDB**: `qr_codes` (persistence) and `entry_logs` (scan history).
- [x] **API Implementation**:
    - [x] `GET /qr/{bookingId}`: Retrieve encrypted QR payload.
    - [x] `POST /qr/scan`: Organizer validates code. Logic: Check existence $\rightarrow$ Verify status is ACTIVE $\rightarrow$ Mark USED $\rightarrow$ Log entry,.

### 8. Notification Service (MongoDB)
- [x] **Database**: Create `devices` collection mapping `userId` to `pushToken`.
- [x] **API Implementation**: `POST /notifications/register-device`.

---

## Phase 5: Frontend Configuration
*Refer to "Mobile app folder structure (Expo + Zustand).md" and "Technical Stack Document".*

- [x] **Initialize Expo**: Setup with TypeScript and NativeWind (Tailwind).
- [x] **Directory Structure**:
    - [x] `/src/store`: Create `useAuthStore` (Role handling) and `useUIStore` (Loading/Error states).
    - [x] `/src/services`: Setup Axios with Interceptors to inject `Authorization: Bearer` token.
    - [x] `/src/screens`: Separate into `/attendee` and `/organizer` folders.
    - [x] `/src/components/ui`: Create atomic components (Buttons, Status Badges).

---

## Phase 6: Frontend Implementation (Screens)
*Strictly follow "Eventify_Design_Specification.md" for pixel-perfect UI.*

### Authentication
- [x] **Splash Screen**: Full-screen gradient, fade-in logo (App.tsx / Initial load).
- [x] **Login/Register**:
    - [x] Role selection cards (Attendee/Organizer).
    - [x] Email verification logic placeholders.

### Attendee Flows
- [x] **Home Feed**: Filter Paid Events by City. Horizontal category chips.
- [x] **Event Details**: Hero image, "Slot Availability Bar".
- [x] **Join Private Event**: Implementation ready for private access integration.
- [x] **Payment Flow**: Integrated Stripe Payment Sheet logic (Transaction creation).
- [x] **My Tickets**: List cards with status badges (Approved/Pending). Click to view QR.

### Organizer Flows
- [x] **Dashboard**: Metrics cards, "Create Event" CTA, "Scan QR" CTA.
- [x] **Create Event**: Toggle between Paid/Unpaid forms. Auto-generate code for Unpaid.
- [x] **Approval Dashboard**: Integrated applicant viewing and deciding.
- [x] **QR Scanner**: Full-screen camera. Handle results: Success (Green), Duplicate/Invalid (Red).

### UI States
- [x] **Empty States**: "No events in city", "No tickets booked".
- [x] **Loading**: Skeleton/Spinner loaders for lists and processing.

---

## Phase 7: Final Integration & Security
- [x] **Data Isolation Check**: Ensure Frontend never calls a microservice DB directly; all traffic must go through the API Gateway.
- [x] **RBAC Enforcement**: Ensure "Create Event" and "Scan QR" routes are inaccessible to Attendees.
- [ ] **OTA Updates**: Configure Expo EAS Build settings.

---
*Sources Used: PRD, Schema-, Deployment-, Flow Diagram-, Design Specs-, Folder Structure-, API Contracts-.*