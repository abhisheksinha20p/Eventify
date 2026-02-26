# Eventify – Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** Eventify  
**Platform:** Mobile Application (iOS & Android)  
**Category:** Event Discovery, Booking, and Entry Management

Eventify is a mobile platform designed to manage **paid public events** and **unpaid private events** through controlled discovery, approval workflows, secure payments, and QR-code–based entry validation. The system ensures strict data isolation, role-based access, and a seamless experience for both attendees and organizers.

---

## 2. Goals & Objectives

- Enable users to discover and attend events with minimal friction
- Allow organizers to manage events, attendees, and entry securely
- Support both **paid (public)** and **unpaid (private/invite-only)** events
- Ensure secure payments, approvals, and entry via QR codes
- Maintain strict data isolation and role-based access control

---

## 3. User Roles

### 3.1 Attendee
- Discovers paid events based on location
- Joins unpaid events using an invite code
- Books slots, makes payments, and receives QR codes
- Uses QR code for event entry

### 3.2 Organizer
- Creates and manages paid and unpaid events
- Defines slots, pricing, and event details
- Approves or rejects attendees for unpaid events
- Scans QR codes at entry and tracks attendance

---

## 4. Event Types

### 4.1 Paid Events (Public)

**Visibility Rule:**  
Paid events are visible **only to users located in the same city/location as the event**.

**Key Characteristics:**
- Slot-based
- Fee-based
- Automatic approval after payment
- QR code generated instantly on successful payment

---

### 4.2 Unpaid Events (Private)

**Visibility Rule:**  
Unpaid events are **not publicly discoverable**. Only users with a valid **event code** can view and apply.

**Key Characteristics:**
- Invite/code-based access
- Manual approval by event creator
- QR code generated only after approval

---

## 5. User Registration & Authentication

### 5.1 Registration Flow

1. User signs up with:
   - Email
   - Password
   - Basic profile details
2. User selects role:
   - Attendee
   - Organizer
3. Email verification is sent
4. Account becomes active only after email verification

### 5.2 Login Flow

- Email + Password login
- Role fetched from backend
- Role-based navigation applied

### 5.3 Session Management

- Each user session is isolated
- Logging out one user does **not** affect other users
- Session tokens stored per device

---

## 6. User Scenarios

### 6.1 Attendee Scenario

1. Attendee registers and verifies email
2. Logs into the app
3. Views paid events based on current location
4. Selects an event and slot
5. Makes payment via Stripe
6. System auto-approves booking
7. QR code is issued
8. QR code is scanned at venue for entry

**Unpaid Event Flow:**
1. Attendee receives event code
2. Logs in and enters event code
3. Fills required details
4. Submits application
5. Waits for organizer approval
6. Receives QR code after approval

---

### 6.2 Organizer Scenario

1. Organizer registers and verifies email
2. Logs into organizer dashboard
3. Creates an event:
   - Paid or Unpaid
4. For paid events:
   - Defines location, slots, pricing
5. For unpaid events:
   - System generates event code
6. Reviews applications (unpaid only)
7. Approves or rejects attendees
8. Scans QR codes at entry

---

## 7. Paid Event Workflow

1. Organizer publishes paid event
2. Event visible to users in same location
3. User books slot
4. Payment completed via Stripe
5. Stripe webhook confirms payment
6. System marks user as **approved**
7. QR code generated and assigned

---

## 8. Unpaid Event Workflow

1. Organizer creates unpaid event
2. System generates unique event code
3. User enters event code
4. User applies to attend
5. Organizer manually approves/rejects
6. On approval, QR code is generated

---

## 9. QR Code & Entry System

- Unique QR per user per event
- Single-use only
- Time-bound
- Linked to user ID and event ID
- On scan:
  - Validates QR
  - Marks entry as used
  - Logs attendance

---

## 10. Payments (Paid Events)

- Payment gateway: **Stripe**
- Stripe handles:
  - Secure payment processing
  - Payment confirmation
- Payment success triggers:
  - Automatic approval
  - QR code issuance

---

## 11. Notifications

- Event discovery notifications (paid events)
- Payment confirmation
- Approval status (unpaid events)
- Event reminders

---

## 12. System Architecture (Microservices-Based)

Eventify follows a **microservices architecture** to ensure scalability, fault isolation, and clean separation of responsibilities.

### 12.1 Microservices Overview

Each core domain is implemented as an independent service:

1. **Auth Service**
   - User registration & login
   - Email verification
   - JWT/token issuance
   - Role management (Attendee / Organizer)

2. **User Service**
   - User profiles
   - Organizer metadata
   - Session isolation per device

3. **Event Service**
   - Event creation (paid/unpaid)
   - Location-based visibility (paid events)
   - Code-based access (unpaid events)
   - Slot and capacity management

4. **Booking Service**
   - Slot booking
   - Booking state management
   - Automatic approval for paid events

5. **Payment Service**
   - Stripe integration
   - Payment intent creation
   - Webhook handling
   - Payment verification

6. **Approval Service**
   - Manual approval/rejection for unpaid events
   - Approval state tracking

7. **QR & Entry Service**
   - QR code generation
   - QR validation and scanning
   - Entry logging
   - Single-use enforcement

8. **Notification Service**
   - Push notifications
   - Email notifications
   - Event reminders and updates

Each service owns its own data store to prevent cross-service data coupling.

---

## 13. Data Isolation & Security

- Strict service-level data ownership
- No direct database access across services
- Communication via secure APIs or message queues
- Role-based access control (RBAC)
- Organizers can only manage their own events
- Attendees can only access events they are eligible for


- Strict separation of:
  - Events
  - Users
  - Bookings
  - Approvals
- Role-based access control (RBAC)
- Organizers can only manage their own events
- Attendees can only access events they are eligible for

---

## 14. Non-Functional Requirements

- Scalable backend architecture
- Secure authentication & authorization
- Reliable QR validation (offline tolerance optional)
- High availability for payment confirmation

---

## 15. Success Metrics

- Successful booking completion rate
- QR scan success rate
- Organizer approval turnaround time
- System uptime and error rate

---

## 16. Future Enhancements

- Seat selection
- Refund & cancellation policies
- Analytics dashboard for organizers
- Multi-city event discovery
- Calendar integrations

---

## 17. Summary

Eventify is a full-stack mobile event management system that combines **location-based discovery**, **invite-only private events**, **Stripe-powered payments**, **manual and automatic approvals**, and **QR-based secure entry**, all while maintaining strict data isolation and role-based access control.

