# 2026-02-26-Eventify-Frontend-Design

## Overview
This design defines the architecture and layout of the MVP frontend for **Eventify**, an event management web application. The initial focus is on the **Event Discovery / Home Page**. We are using a "Hero Banner + Categorized Grid" approach to maximize visual impact and user engagement.

## Architecture & Technology Stack
- **Framework**: React + TypeScript (Vite)
- **Styling**: Vanilla CSS (focusing on modern, vibrant design, glassmorphism, and smooth micro-animations)
- **Design Tooling**: Stitch MCP
- **Target Experience**: High-conversion, visually stunning, modern UI

## Page Structure & Design (Home Page MVP)

### 1. Global Navigation (Header)
- **Left**: Eventify Logo (links to Home).
- **Center**: Quick navigation links (`Browse Events`, `Host an Event`).
- **Right**: User Actions (`Log In`, `Sign Up`).
- **Design**: Clean, slightly transparent glassmorphism header that becomes solid (white/dark gray) upon scrolling.

### 2. Hero Section
- **Visual**: Large, high-quality, vibrant background image or subtle looping pattern representing excitement/events.
- **Content**: Bold headline: "Discover Your Next Unforgettable Experience."
- **Actionable**: A prominent, floating search bar centered on the screen, allowing search by keyword, location, and date.

### 3. Featured Events (Horizontal Scroll/Grid)
- **Content**: Top 3-4 highly curated or popular events.
- **Design**: Large cards with premium imagery. Implement hover effects (slight lift and subtle shadow) for a dynamic feel.
- **Details**: Date (prominent), Event Title, Location, and Price.

### 4. Explore by Category
- **Content**: Badges/Pills for categories (`Music`, `Tech`, `Workshops`, `Food & Drink`).
- **Design**: Horizontal scrollable row. Clicking filters the events below instantaneously.

### 5. Upcoming Events Grid
- **Content**: The main directory of events.
- **Design**: Clean 3-column grid (desktop) with standard-sized event cards featuring an "Add to Bookmarks/Favorites" heart icon.
- **Actionable**: A "Load More" button at the bottom.

### 6. Global Footer
- **Content**: Links (About, Contact, Help, Terms), Social Icons, and a Newsletter signup input.

## Next Steps
This document serves as the foundation for the implementation phase. We will use the `stitch-loop` strategy and the `writing-plans` skill to generate the frontend codebase iteratively based on this design.
