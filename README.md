# The Boutique - Event-Driven E-Commerce Platform

A modern, event-driven e-commerce microservices application built with Node.js, React, and Apache Kafka. This project demonstrates complex distributed system patterns including choreography-based sagas, event sourcing, and real-time updates.

## 🏗 Architecture

The application is composed of loosely coupled microservices that communicate asynchronously via Kafka events.

### Microservices

- **Auth Service (`/auth`)**: Handles user authentication (JWT), signup/signin flows.
- **Products Service**: Manages product catalog and inventory checks.
- **Orders Service (`/orders`)**: Core order management. Handles order creation, status transitions (Created -> Cancelled/Completed), and coordinates the order saga.
- **Payments Service (`/payments`)**: Processes mock payments. Listens for created orders and emits payment completed events.
- **Expiration Service (`/expiration`)**: Manages order timeouts. Uses BullMQ (Redis) to schedule expiration events (15-minute window for payment).
- **Client (`/client`)**: A modern React 19 application with a premium, minimalist UI.

### Event Bus (Apache Kafka)

Services publish and subscribe to domain events:

- `product:created`
- `order:created`
- `order:cancelled`
- `payment:created`
- `expiration:complete`

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS v4 (Minimalist "Boutique" Theme), Vite.
- **Backend**: Node.js, Express, TypeScript.
- **Messaging**: Apache Kafka (Redpanda for local dev).
- **Database**: MongoDB.
- **Queue**: Redis (BullMQ) for expiration jobs.
- **Containerization**: Docker & Docker Compose.
- **Tooling**: Skaffold (optional), Kubernetes (manifests included).

## ✨ Key Features

- **Real-time UI**: The frontend updates instantly via Server-Sent Events (SSE) when order statuses change (e.g., Created -> Cancelled).
- **Saga Pattern**: Implements a choreography-based saga for order fulfillment. If an order isn't paid within 15 minutes, the Expiration service triggers a cancellation event, releasing reserved inventory.
- **Optimistic Concurrency Control**: MongoDB versioning prevents race conditions on order updates.
- **Premium UX**:
  - Sticky, scrollable cart with real-time total calculation.
  - "Lock-down" mode: Cart editing is disabled while an order is pending payment.
  - Live order expiration timers on the dashboard.
  - Seamless "One-Click" payment simulation.

## 🛠 Getting Started

### Prerequisites

- Docker Desktop
- Node.js 18+ (for local client dev)

### Running Locally (Docker Compose)

The easiest way to start the entire system:

1.  **Clone the repository**
2.  **Start the services**:

    ```bash
    docker-compose up --build
    ```

    This will spin up:
    - All microservices (Auth, Orders, Payments, Expiration)
    - MongoDB instance
    - Redpanda (Kafka)
    - Redis

3.  **Start the Client**:
    Open a new terminal and run the frontend:

    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access the App**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧪 Testing the Flow

1.  **Sign Up**: Create an account.
2.  **Add to Cart**: Add items from the storefront.
3.  **Checkout**: Click "Proceed to Checkout". This creates an order and reserves the ticket.
    - _Observe_: The cart locks, and an order appears in the history with "Created" status and a 15-minute timer.
4.  **Pay**: Click "Pay Now" on the order card.
    - _Result_: Order moves to "Completed".
5.  **Timeout Test**: Create an order but _don't_ pay. Wait 15 minutes (or adjust `expiration/src/events/listeners/order-created-listener.ts` for testing).
    - _Result_: Order automatically moves to "Cancelled".

## 📂 Project Structure

```
├── auth/           # Authentication Service
├── client/         # React Frontend
├── common/         # Shared NPM library (events, middlewares)
├── expiration/     # job scheduler for order timeouts
├── orders/         # Order management & Saga coordinator
├── payments/       # Payment processing
└── infra/          # K8s manifests (optional)
```

## 🎨 UI Theme

Refreshed with a "Modern Boutique" aesthetic:

- **Pastel Palette**: Soft blue/indigo gradients for backgrounds.
- **Minimalism**: Clean white cards with subtle shadows.
- **Typography**: Inter font for high readability.
- **Feedback**: Animated badges for live system status and order timeouts.
