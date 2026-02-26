
# Eventify – Mobile App Design Specification

This document consolidates **pixel-perfect wireframes**, **Figma screen checklist**, **empty / loading / error state designs**, and **Figma Auto-Layout structure** for the Eventify mobile application.

Target: iOS & Android (Expo / React Native)  
Design Level: Production-grade, handoff-ready

---

## 1. Pixel-Perfect Wireframes

### Base Frame
- Device: 390 × 844
- Grid: 8pt system
- Layout: Auto Layout (Vertical)
- Corner radius standard: 12–16
- Touch target: ≥ 44px

---

### 1.1 Splash Screen
- Full-screen gradient background
- Centered Eventify logo
- Fade-in animation (≤ 300ms)

---

### 1.2 Login Screen
- Logo (top-center)
- Email input
- Password input (visibility toggle)
- Primary CTA: Log In
- Secondary CTA: Create account

---

### 1.3 Register Screen
- Email input
- Password input
- Role selection cards:
  - Attendee
  - Organizer
- CTA disabled until role selected

---

### 1.4 Email Verification
- Illustration
- Status text
- Resend email action
- Blocking screen

---

### 1.5 Attendee Home (Paid Event Feed)
- City indicator
- Search icon
- Category chips (horizontal scroll)
- Event cards (vertical list)

Event Card:
- Banner image (140px)
- Event name
- Date & time
- Location
- Price badge

---

### 1.6 Join Private Event
- Event code input
- Join Event CTA
- Inline error on invalid code

---

### 1.7 Event Detail
- Hero image
- Organizer info
- Date, time, location
- Slot availability bar
- Price (paid only)
- Sticky bottom CTA

---

### 1.8 Slot Selection
- Slot cards
- Remaining capacity indicator
- Price breakdown
- Continue CTA

---

### 1.9 Stripe Payment
- Native Stripe payment sheet
- Secure payment indicators

---

### 1.10 Booking Success
- Animated checkmark
- Confirmation text
- View Ticket CTA

---

### 1.11 My Tickets
- Ticket cards with status badge:
  - Approved
  - Pending
  - Used

---

### 1.12 QR Ticket Screen
- Large QR (white background)
- Event metadata
- Status text

---

### 1.13 Organizer Dashboard
- Metric cards
- Create Event CTA
- Scan QR CTA

---

### 1.14 Create Event
- Event type selection
- Paid event form
- Unpaid event form with auto-generated code

---

### 1.15 Attendee Management
- Applicant cards
- Approve / Reject actions
- Approved QR indicator

---

### 1.16 QR Scanner
- Full-screen camera
- Scan frame
- Flash toggle
- Scan result screens

---

## 2. Figma Screen Checklist

### Authentication
- [ ] Splash
- [ ] Login
- [ ] Register
- [ ] Email Verification

### Attendee
- [ ] Home (Paid Events)
- [ ] Search & Filters
- [ ] Join Private Event
- [ ] Event Detail (Paid)
- [ ] Event Detail (Unpaid)
- [ ] Slot Selection
- [ ] Stripe Payment
- [ ] Booking Success
- [ ] My Tickets
- [ ] QR Ticket

### Organizer
- [ ] Dashboard
- [ ] Create Event – Type
- [ ] Create Paid Event
- [ ] Create Unpaid Event
- [ ] Applicant List
- [ ] Approved Attendees
- [ ] QR Scanner
- [ ] Scan Result (Valid / Used / Invalid)

### System
- [ ] Empty States
- [ ] Loading States
- [ ] Error States
- [ ] Dark Mode Variants

---

## 3. Empty / Loading / Error States

### Empty States
- No events in city
- No tickets booked
- No applicants yet

Structure:
- Illustration / Icon
- Title
- Description
- Optional CTA

---

### Loading States
- Skeleton loaders for lists
- Spinner with context text for payments & QR validation

---

### Error States
- Payment failed (Retry CTA)
- Invalid event code
- QR already used
- Network error with retry

All states replace content inside the same layout container.

---

## 4. Figma Auto-Layout Structure

### Root Screen
- Auto Layout: Vertical
- Padding: 0
- Spacing: 0

Structure:
- Status bar spacer
- App bar (optional)
- Scroll container
- Bottom CTA / Tab bar (optional)

---

### Scroll Container
- Auto Layout: Vertical
- Padding: 16
- Spacing: 16
- Height: Fill container

---

### App Bar
- Auto Layout: Horizontal
- Padding: 16
- Space-between alignment

---

### Event Card (Component)
- Auto Layout: Vertical
- Padding: 12
- Spacing: 8
- Radius: 16

---

### Buttons
- Height: 48
- Auto Layout: Horizontal
- Variants:
  - Default
  - Loading
  - Disabled

---

### Status Badge
- Auto Layout: Horizontal
- Padding: 6 × 10
- Radius: 999
- Color variants based on state

---

### State Container (Empty / Error / Loading)
- Center aligned
- Icon / Illustration
- Text stack
- Optional CTA

---

## 5. Naming Conventions

Screens:
- Screen / Attendee / Home
- Screen / Organizer / Dashboard

Components:
- Component / Event Card
- Component / Button / Primary
- Component / Badge / Status

---

## 6. Developer Alignment

- Figma Auto Layout → React Native Flexbox
- Variants → Component props
- Spacing tokens → consistent margins & gaps
- QR always rendered on light background

---

End of document.
