Based on the **Technical Stack & Architecture Document** and **Design Specifications**, here is the recommended folder structure for the Eventify mobile application.

This structure is optimized for **Expo (React Native)** using **TypeScript**, **NativeWind**, and **Zustand**, ensuring a clean separation between UI, state, and business logic.

***

# Mobile App Folder Structure (Expo + Zustand)

## **Root Configuration**
The root directory handles environment configuration, styling setup, and entry points.

```text
eventify-mobile/
├── App.tsx                 # Entry point (Providers setup)
├── app.json                # Expo configuration
├── babel.config.js         # Babel setup (NativeWind plugin)
├── tailwind.config.js      # NativeWind (Tailwind CSS) config
├── tsconfig.json           # TypeScript configuration
├── package.json
└── src/                    # Main source code
```

---

## **Source Directory (`/src`)**
The application logic is contained entirely within `src` to maintain a clean workspace.

```text
src/
├── assets/                 # Static assets
│   ├── fonts/
│   └── images/             # Logos, illustrations
│
├── components/             # Reusable UI components
│   ├── ui/                 # "Atoms" (Buttons, Inputs, Badges)
│   │   ├── Button.tsx      # Variants: Default, Loading, Disabled
│   │   ├── Input.tsx       # Standard text inputs
│   │   ├── Badge.tsx       # Status Badges (Approved, Pending)
│   │   └── Screen.tsx      # Auto-layout wrapper (Safe Area + Padding)
│   │
│   ├── shared/             # "Molecules" used across roles
│   │   ├── EmptyState.tsx  #
│   │   ├── ErrorState.tsx  #
│   │   └── Loading.tsx     # Skeleton loaders / Spinners
│   │
│   └── features/           # Domain-specific components
│       ├── event/
│       │   └── EventCard.tsx # Banner, Title, Date, Price
│       ├── ticket/
│       │   └── TicketCard.tsx # QR preview, Status
│       └── payment/
│           └── StripeSheet.tsx # Stripe integration wrapper
│
├── constants/
│   ├── colors.ts           # Theme colors
│   ├── layout.ts           # 8pt grid system values
│   └── routes.ts           # Navigation route names
│
├── navigation/             # React Navigation Setup
│   ├── RootNavigator.tsx   # Switch between Auth/App flows
│   ├── AuthStack.tsx       # Login, Register, Verify
│   ├── AppTabs.tsx         # Bottom Tabs (Home, My Tickets, Profile)
│   ├── AttendeeStack.tsx   # Discovery -> Details -> Booking
│   └── OrganizerStack.tsx  # Dashboard -> Create -> Scan
│
├── screens/                # Screen Views
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── VerifyEmailScreen.tsx
│   │
│   ├── attendee/           # Attendee Workflow
│   │   ├── HomeScreen.tsx        # Paid Event Feed (Location-based)
│   │   ├── PrivateJoinScreen.tsx # Unpaid Event Code Input
│   │   ├── EventDetailScreen.tsx
│   │   ├── SlotSelectionScreen.tsx
│   │   ├── PaymentScreen.tsx     # Stripe Wrapper
│   │   ├── SuccessScreen.tsx
│   │   └── MyTicketsScreen.tsx
│   │
│   └── organizer/          # Organizer Workflow
│       ├── DashboardScreen.tsx
│       ├── CreateEventScreen.tsx
│       ├── ManageAttendeesScreen.tsx # Approval Workflow
│       └── QRScannerScreen.tsx       # Camera View
│
├── services/               # API & Networking
│   ├── api.ts              # Axios instance (Interceptors for Token)
│   ├── auth.service.ts     # Login, Register, Verify
│   ├── event.service.ts    # Fetch feed, Create event
│   ├── booking.service.ts  # Book slot, Stripe Intent
│   └── qr.service.ts       # Generate/Scan QR
│
├── store/                  # Zustand State Management
│   ├── useAuthStore.ts     # User Session, Token, Role
│   ├── useEventStore.ts    # Event Feed, Filters (City/Category)
│   ├── useBookingStore.ts  # Current selection, Payment status
│   └── useUIStore.ts       # Global Loading/Error states
│
├── types/                  # TypeScript Definitions
│   ├── navigation.d.ts     # Route params
│   ├── models.d.ts         # User, Event, Slot, Booking interfaces
│   └── api.d.ts            # API Response structures
│
└── utils/
    ├── formatDate.ts
    ├── formatCurrency.ts
    ├── validation.ts       # Email/Password regex
    └── storage.ts          # SecureStore wrappers
```

---

## **Key Directory Rationale**

### **1. `store/` (Zustand)**
Per the technical stack, Zustand is used for global state. Separating stores by domain (`auth`, `event`, `booking`) keeps logic manageable.
*   `useAuthStore`: Handles JWT tokens and strictly separates Attendee/Organizer roles.
*   `useUIStore`: Manages the global loading and error states defined in the design specs.

### **2. `components/ui` vs `components/features`**
*   **UI**: Contains atomic elements like the `Status Badge` (Auto Layout, Radius: 999) and `Buttons` (Height: 48) ensuring pixel-perfect adherence to the design system.
*   **Features**: Contains complex business components like `EventCard` which combines images, text, and layout logic specific to the PRD.

### **3. `screens/` (Role-Based)**
The screens are physically separated into `attendee` and `organizer` folders. This mirrors the **RBAC** (Role-Based Access Control) requirement, making it easier to secure routes and prevent logic bleed between the two distinct user personas.

### **4. `services/` (Axios)**
Centralized networking via Axios allows for a single point to inject the `Authorization: Bearer <token>` header required by the microservices backend.