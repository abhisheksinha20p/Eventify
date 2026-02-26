Based on the **Technical Stack & Architecture Document** and the **Microservices** detailed in the PRD, here is the Markdown file for the Deployment Architecture.

***

# Deployment Architecture (Gateway + Docker + Cloud)

This document outlines the infrastructure strategy for deploying the Eventify microservices ecosystem. The architecture utilizes **Docker** for containerization, a central **API Gateway** for routing and security, and cloud providers (AWS/GCP/Render) for hosting.

## **1. High-Level Architecture**

Eventify follows a **Client–Gateway–Microservices** model. All external traffic from the mobile application flows through the API Gateway, which acts as the single entry point.

```mermaid
graph TD
    subgraph Client_Layer
        MobileApp[Mobile App (Expo/React Native)]
    end

    subgraph Security_Layer
        Gateway[API Gateway (Node.js/Express)]
        LB[Load Balancer]
    end

    subgraph Service_Layer
        Auth[Auth Service]
        User[User Service]
        Event[Event Service]
        Book[Booking Service]
        Pay[Payment Service]
        Approv[Approval Service]
        QR[QR & Entry Service]
        Notif[Notification Service]
    end

    subgraph Data_Layer
        Mongo[(MongoDB Cluster)]
        Postgres[(PostgreSQL)]
        Redis[(Redis Cache)]
    end

    MobileApp -->|HTTPS / JWT| LB
    LB --> Gateway
    
    Gateway -->|Route / Auth| Auth
    Gateway -->|Route / Auth| User
    Gateway -->|Route / Auth| Event
    Gateway -->|Route / Auth| Book
    Gateway -->|Route / Auth| Pay
    Gateway -->|Route / Auth| Approv
    Gateway -->|Route / Auth| QR
    Gateway -->|Route / Auth| Notif

    Auth & User & Event & Book & Approv & Notif --> Mongo
    Pay --> Postgres
    QR --> Redis & Mongo
```
*(Source: Technical Stack)*

---

## **2. API Gateway Configuration**
**Role**: The Gateway decouples the client from the internal microservices, handling cross-cutting concerns.

*   **Technology**: Node.js with Express or Fastify.
*   **Key Responsibilities**:
    1.  **Request Routing**: Proxies requests to the appropriate microservice (e.g., `/auth/*` $\rightarrow$ Auth Service).
    2.  **Authentication**: Validates `Authorization: Bearer <token>` JWTs before passing requests downstream.
    3.  **Rate Limiting**: Protects against DDOS and abuse.
    4.  **SSL Termination**: Handles HTTPS termination (if not handled by a preceding Load Balancer).

---

## **3. Docker Containerization Strategy**
Each microservice is packaged as an independent Docker container to ensure consistent environments across development and production.

### **Dockerfile Template (Node.js Services)**
Applied to: *Auth, User, Event, Booking, Payment, Approval, Notification, Gateway*.
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
*(Source: Technical Stack)*

### **Service Isolation**
*   **Stateless**: Containers are stateless; they scale horizontally without local data persistence.
*   **Database**: Each service container connects to its own isolated database URI (passed via Environment Variables).

---

## **4. Cloud Infrastructure & Orchestration**

### **4.1 Production Environment (AWS / GCP / Render)**
*   **Orchestration**: Kubernetes (K8s) or managed container services (e.g., AWS Fargate, Google Cloud Run, Render).
*   **Database Hosting**:
    *   **MongoDB Atlas**: Managed cluster for Auth, User, Event, Booking, Approval, and Notification services.
    *   **Amazon RDS / Cloud SQL**: Managed PostgreSQL for the Payment Service (Transactional Integrity).
    *   **Redis Cloud**: Managed Redis for QR Code caching and validation.

### **4.2 Development Environment**
*   **Docker Compose**: Used to spin up the entire stack locally.
*   **Configuration**:
    ```yaml
    version: '3.8'
    services:
      gateway:
        build: ./gateway
        ports: ["8080:8080"]
      auth-service:
        build: ./services/auth
        environment:
          - MONGO_URI=mongodb://mongo:27017/auth_db
      # ... other services ...
      mongo:
        image: mongo
      postgres:
        image: postgres
      redis:
        image: redis
    ```

---

## **5. Mobile Deployment (Frontend)**
*   **Platform**: Expo (React Native).
*   **Build Service**: **Expo EAS** (Expo Application Services) is used to build `.ipa` (iOS) and `.apk/.aab` (Android) binaries in the cloud.
*   **Update Strategy**: OTA (Over-the-Air) updates via Expo Updates for non-native code changes.

---

## **6. CI/CD Pipeline**
Automated workflows ensure rapid and safe deployment.

1.  **Code Commit**: Developer pushes to GitHub/GitLab.
2.  **Test**: CI runner executes unit tests for modified services.
3.  **Build**: Docker images are built and tagged.
4.  **Push**: Images are pushed to a Container Registry (e.g., Docker Hub, ECR).
5.  **Deploy**:
    *   **Backend**: Orchestrator pulls new images and performs a rolling update.
    *   **Frontend**: EAS Build triggers for new binary release or OTA update.

---

## **7. Security & Networking**
*   **HTTPS Everywhere**: All communication between Client $\leftrightarrow$ Gateway and Gateway $\leftrightarrow$ Services is encrypted.
*   **Webhooks**: The Payment Service exposes a public endpoint specifically for Stripe Webhooks, secured by signature verification.
*   **Internal Network**: Microservices sit inside a private VPC, inaccessible directly from the public internet. Only the Gateway and Load Balancer are exposed.