Based on the **Microservices Architecture** defined in the technical documents and the functional requirements from the PRD and Design Specs, here is the Markdown file containing the service-wise API contracts.

***

# Service-wise API Contracts (OpenAPI-style)

This document outlines the RESTful API contracts for the Eventify microservices architecture. It aligns with the **Client–Gateway–Microservices** model, utilizing **JWT-based authentication** and strict data isolation.

## **Shared Definitions**
*   **Base URL**: `https://api.eventify.com/v1/{service-name}` (routed via API Gateway)
*   **Authentication**: Most endpoints require a `Authorization: Bearer <token>` header.
*   **Response Format**: JSON

---

## **1. Auth Service**
**Responsible for**: Registration, Login, Email Verification, Token Issuance.

### `POST /auth/register`
**Summary**: Register a new user (Attendee or Organizer).
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123",
      "role": "ATTENDEE" // or "ORGANIZER"
    }
    ```
    *(Source:)*
*   **Response (201 Created)**:
    ```json
    {
      "message": "Registration successful. Please verify your email."
    }
    ```

### `POST /auth/login`
**Summary**: Authenticate user and receive a session token.
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securePassword123"
    }
    ```
    *(Source:)*
*   **Response (200 OK)**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1Ni...",
      "refreshToken": "d7s8f7d8s...",
      "user": {
        "id": "12345",
        "role": "ATTENDEE",
        "isVerified": true
      }
    }
    ```

### `POST /auth/verify-email`
**Summary**: Complete registration by verifying email.
*   **Body**:
    ```json
    {
      "token": "verification_code_from_email"
    }
    ```
    *(Source:)*
*   **Response (200 OK)**:
    ```json
    {
      "status": "active"
    }
    ```

---

## **2. User Service**
**Responsible for**: User profiles, organizer metadata, session isolation.

### `GET /users/me`
**Summary**: Get current user profile details.
*   **Headers**: `Authorization: Bearer <token>`
*   **Response (200 OK)**:
    ```json
    {
      "id": "12345",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "ATTENDEE",
      "city": "New York" // Used for location filtering
    }
    ```

### `PUT /users/me`
**Summary**: Update user profile.
*   **Body**:
    ```json
    {
      "firstName": "Jane",
      "city": "San Francisco"
    }
    ```
*   **Response (200 OK)**:
    ```json
    { "success": true }
    ```

---

## **3. Event Service**
**Responsible for**: Event creation, location visibility, event codes, slots.

### `POST /events`
**Summary**: Create a new event (Paid or Unpaid).
*   **Headers**: `Authorization: Bearer <token>` (Organizer only)
*   **Body**:
    ```json
    {
      "title": "Tech Conference 2024",
      "type": "PAID", // or "UNPAID"
      "description": "Annual tech meetup...",
      "date": "2024-12-01T09:00:00Z",
      "location": {
        "city": "London",
        "address": "Excepte Hall"
      },
      "slots": [
        { "name": "VIP", "capacity": 50, "price": 100 },
        { "name": "General", "capacity": 200, "price": 20 }
      ],
      "bannerImage": "url_string"
    }
    ```
    *(Source:)*
*   **Response (201 Created)**:
    ```json
    {
      "eventId": "evt_998877",
      "eventCode": "TC2024" // Auto-generated for Unpaid events
    }
    ```

### `GET /events/public`
**Summary**: Discovery feed for Paid events.
*   **Query Params**:
    *   `city`: (Required) Filter by user location.
    *   `category`: (Optional) Filter chips.
*   **Response (200 OK)**:
    ```json
    [
      {
        "id": "evt_998877",
        "title": "Tech Conference 2024",
        "banner": "url_string",
        "date": "2024-12-01T09:00:00Z",
        "location": "London",
        "priceBadge": "$20 - $100"
      }
    ]
    ```
    *(Source:)*

### `GET /events/private/verify`
**Summary**: Validate an invite code for a Private/Unpaid event.
*   **Query Params**: `code={event_code}`
*   **Response (200 OK)**:
    ```json
    {
      "valid": true,
      "eventId": "evt_555666",
      "preview": {
        "title": "Private Gala",
        "organizer": "John Doe"
      }
    }
    ```
    *Response (400 Bad Request): Invalid code*
    *(Source:)*

### `GET /events/{eventId}`
**Summary**: Get full event details.
*   **Response (200 OK)**:
    ```json
    {
      "id": "evt_998877",
      "title": "Tech Conference 2024",
      "organizerId": "org_1122",
      "slots": [
        { "id": "slot_1", "name": "General", "remaining": 120, "price": 20 }
      ]
    }
    ```
    *(Source:)*

---

## **4. Booking Service**
**Responsible for**: Slot booking, booking lifecycle.

### `POST /bookings`
**Summary**: Initiate a booking request.
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "eventId": "evt_998877",
      "slotId": "slot_1"
    }
    ```
    *(Source:)*
*   **Response (201 Created)**:
    ```json
    {
      "bookingId": "bk_777888",
      "status": "PENDING_PAYMENT", // or PENDING_APPROVAL for unpaid
      "amountDue": 2000 // in cents
    }
    ```

### `GET /bookings/my`
**Summary**: List user's tickets (My Tickets).
*   **Headers**: `Authorization: Bearer <token>`
*   **Response (200 OK)**:
    ```json
    [
      {
        "bookingId": "bk_777888",
        "eventTitle": "Tech Conference",
        "status": "APPROVED", // Approved, Pending, Used
        "date": "2024-12-01"
      }
    ]
    ```
    *(Source:)*

---

## **5. Payment Service**
**Responsible for**: Stripe integration, Webhooks.

### `POST /payments/create-intent`
**Summary**: Create Stripe Payment Intent for a booking.
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "bookingId": "bk_777888"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "clientSecret": "pi_12345_secret_67890", // For Stripe Payment Sheet
      "amount": 2000,
      "currency": "usd"
    }
    ```

### `POST /payments/webhook`
**Summary**: Handle Stripe webhooks (server-to-server).
*   **Body**: (Stripe Event Object)
*   **Behavior**: On `payment_intent.succeeded`, triggers Booking Service to mark `APPROVED` and QR Service to generate code.
    *(Source:)*

---

## **6. Approval Service**
**Responsible for**: Manual approval/rejection for unpaid events.

### `GET /approvals/{eventId}/applicants`
**Summary**: List applicants for an organizer's unpaid event.
*   **Headers**: `Authorization: Bearer <token>` (Organizer only)
*   **Response (200 OK)**:
    ```json
    [
      {
        "bookingId": "bk_3344",
        "user": { "name": "Alice Smith", "email": "alice@example.com" },
        "status": "PENDING"
      }
    ]
    ```
    *(Source:)*

### `POST /approvals/{bookingId}/decide`
**Summary**: Approve or Reject an applicant.
*   **Body**:
    ```json
    {
      "action": "APPROVE" // or "REJECT"
    }
    ```
*   **Response (200 OK)**:
    ```json
    { "status": "APPROVED" }
    ```
    *Note: Triggers QR code generation upon approval.*

---

## **7. QR & Entry Service**
**Responsible for**: QR generation, validation, entry logging.

### `GET /qr/{bookingId}`
**Summary**: Retrieve QR code payload for a confirmed booking.
*   **Headers**: `Authorization: Bearer <token>`
*   **Response (200 OK)**:
    ```json
    {
      "qrData": "encrypted_string_with_booking_and_user_id",
      "generatedAt": "2024-11-20T10:00:00Z"
    }
    ```
    *(Source:)*

### `POST /qr/scan`
**Summary**: Validate a scanned QR code at the venue.
*   **Headers**: `Authorization: Bearer <token>` (Organizer only)
*   **Body**:
    ```json
    {
      "qrData": "encrypted_string_from_camera"
    }
    ```
    *(Source:)*
*   **Response (200 OK)**:
    ```json
    {
      "status": "VALID", // or "USED", "INVALID"
      "attendeeName": "John Doe",
      "slot": "VIP"
    }
    ```
    *(Source:)*

---

## **8. Notification Service**
**Responsible for**: Push and Email notifications.

### `POST /notifications/register-device`
**Summary**: Register a device push token (Expo Push Token).
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "pushToken": "ExponentPushToken[xxxxxxxx]"
    }
    ```
    *(Source:)*
*   **Response (200 OK)**:
    ```json
    { "success": true }
    ```