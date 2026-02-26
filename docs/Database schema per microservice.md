Based on the architecture defined in the **Technical Stack Document** and **PRD**, here is the database schema definition for the Eventify microservices.

**Note on Architecture**: Eventify enforces **strict data isolation**. Each microservice owns its own database. There are no cross-service joins. Relationships are maintained via logical ID references (e.g., `userId`, `eventId`) passed between services.

***

# Database Schema per Microservice

## **1. Auth Service**
**Responsibility**: User registration, login credentials, role management, email verification.
**Database**: MongoDB (Implied via Node.js stack and JSON-like user objects).

### Collection: `accounts`
Stores authentication credentials and high-level role data.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. Unique Account ID. |
| `email` | String | Unique index. User login email. |
| `passwordHash` | String | Bcrypt/Argon2 hashed password. |
| `role` | String | Enum: `ATTENDEE` \| `ORGANIZER`. |
| `isVerified` | Boolean | `false` until email verification completes. |
| `verificationToken`| String | Token sent via email for verification. |
| `createdAt` | DateTime | Timestamp. |

---

## **2. User Service**
**Responsibility**: User profiles, organizer metadata, session isolation.
**Database**: MongoDB.

### Collection: `profiles`
Stores rich user data separate from auth credentials.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. Unique Profile ID. |
| `accountId` | String | **Ref**. Links to Auth Service `accounts._id`. |
| `firstName` | String | User's first name. |
| `lastName` | String | User's last name. |
| `city` | String | **Critical**. Used to filter Paid Event visibility. |
| `avatarUrl` | String | URL to profile image. |

---

## **3. Event Service**
**Responsibility**: Event creation, visibility logic, slots, event codes.
**Database**: MongoDB.

### Collection: `events`
Stores core event data.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. Unique Event ID. |
| `organizerId` | String | **Ref**. ID of the organizer creating the event. |
| `title` | String | Event title. |
| `description` | String | Full event details. |
| `type` | String | Enum: `PAID` \| `UNPAID`. |
| `eventCode` | String | (Unique). Required for **Unpaid** events discovery. |
| `date` | DateTime | Event start time. |
| `location` | Object | `{ city: String, address: String, lat: Number, lng: Number }`. |
| `bannerImage` | String | URL for event banner. |
| `status` | String | Enum: `DRAFT` \| `PUBLISHED` \| `CANCELLED`. |

### Embedded Document: `slots` (inside `events`)
Slot management for capacity planning.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique Slot ID. |
| `name` | String | e.g., "VIP", "General Admission". |
| `capacity` | Integer | Total tickets available. |
| `bookedCount` | Integer | Current number of sold tickets. |
| `price` | Integer | Price in cents (0 for Unpaid events). |

---

## **4. Booking Service**
**Responsibility**: Booking lifecycle, state management.
**Database**: MongoDB.

### Collection: `bookings`
Tracks the user's application or purchase of a slot.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. Unique Booking ID. |
| `userId` | String | **Ref**. The attendee. |
| `eventId` | String | **Ref**. The event. |
| `slotId` | String | **Ref**. Specific slot selected. |
| `status` | String | Enum: `PENDING_PAYMENT`, `PENDING_APPROVAL`, `APPROVED`, `REJECTED`, `USED`. |
| `amountDue` | Integer | Snapshot of price at time of booking. |
| `createdAt` | DateTime | Timestamp. |

---

## **5. Payment Service**
**Responsibility**: Stripe integration, transactional integrity.
**Database**: PostgreSQL (Chosen for transactional reliability).

### Table: `transactions`
Logs all financial interactions with Stripe.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | **PK**. Unique Transaction ID. |
| `booking_id` | VARCHAR | **Ref**. Links to Booking Service. |
| `stripe_intent_id`| VARCHAR | Stripe Payment Intent ID. |
| `amount` | INTEGER | Amount in smallest currency unit (e.g., cents). |
| `currency` | VARCHAR(3)| e.g., 'USD'. |
| `status` | VARCHAR | Enum: 'requires_payment_method', 'succeeded', 'failed'. |
| `created_at` | TIMESTAMP| Record creation time. |

---

## **6. Approval Service**
**Responsibility**: Manual workflow for unpaid/private events.
**Database**: MongoDB.

### Collection: `decisions`
Audit log of organizer approvals or rejections.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. Decision ID. |
| `bookingId` | String | **Ref**. The booking being decided on. |
| `organizerId` | String | **Ref**. Organizer making the decision. |
| `action` | String | Enum: `APPROVE` \| `REJECT`. |
| `timestamp` | DateTime | When the decision was made. |

---

## **7. QR & Entry Service**
**Responsibility**: QR generation, validation, single-use enforcement.
**Database**: Redis (Cache/Fast Access) + MongoDB (Persistent Logs).

### Collection: `qr_codes` (MongoDB)
Persistent record of generated codes.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. |
| `bookingId` | String | **Ref**. Links to the approved booking. |
| `qrPayload` | String | Encrypted string containing user/event validation data. |
| `status` | String | Enum: `ACTIVE` \| `USED` \| `INVALID`. |
| `generatedAt` | DateTime | When the code was issued. |

### Collection: `entry_logs` (MongoDB)
History of scans at the venue.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. |
| `qrId` | ObjectId | **Ref**. The QR code scanned. |
| `scannedBy` | String | **Ref**. Organizer ID who scanned it. |
| `scannedAt` | DateTime | Timestamp of entry. |
| `result` | String | Enum: `SUCCESS` \| `DUPLICATE_ENTRY`. |

---

## **8. Notification Service**
**Responsibility**: Push tokens and communication logs.
**Database**: MongoDB (implied).

### Collection: `devices`
Maps users to their mobile device tokens.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | **PK**. |
| `userId` | String | **Ref**. User owner. |
| `pushToken` | String | Expo Push Token (e.g., `ExponentPushToken[...]`). |
| `platform` | String | `ios` \| `android`. |
| `updatedAt` | DateTime | Last time token was refreshed. |