# The Boutique - Event-Driven E-Commerce Platform

A modern, event-driven e-commerce microservices application built with Node.js, React, and Apache Kafka. This project demonstrates complex distributed system patterns including choreography-based sagas and real-time updates without relying on heavy external databases.

## 🏗 Architecture

The application is composed of loosely coupled microservices that communicate asynchronously via Kafka events. Data persistence is handled in-memory for simplicity and speed in this learning project.

### Microservices

- **Auth Service (`/auth`)**: Handles user authentication (JWT), signup/signin flows.
- **Products Service**: Manages product catalog and inventory.
- **Orders Service (`/orders`)**: Core order management. Handles order creation, status transitions (Created -> Cancelled/Completed), and coordinates the order saga.
- **Payments Service (`/payments`)**: Processes mock payments. Listens for created orders and emits payment completed events.
- **Expiration Service (`/expiration`)**: Manages order timeouts using native `setTimeout` strategies to trigger expiration events (15-minute window for payment).
- **Client (`/client`)**: A modern React 19 application with a premium, minimalist UI.

### Event Bus (Apache Kafka)

Services publish and subscribe to domain events:

- `order-created`
- `order-cancelled`
- `payment-created`
- `expiration-complete`

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS v4 (Minimalist "Boutique" Theme), Vite.
- **Backend**: Node.js, Express, TypeScript.
- **Messaging**: Apache Kafka.
- **Persistence**: In-Memory (Arrays/Maps).
- **Containerization**: Docker & Docker Compose.

## ✨ Key Features

- **Real-time UI**: The frontend updates instantly via Server-Sent Events (SSE) when order statuses change (e.g., Created -> Cancelled).
- **Saga Pattern**: Implements a choreography-based saga for order fulfillment. If an order isn't paid within 15 seconds, the Expiration service triggers a cancellation event.
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
    - Kafka

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
3.  **Checkout**: Click "Proceed to Checkout". This creates an order.
    - _Observe_: The cart locks, and an order appears in the history with "Created" status and a 15-second timer.
4.  **Pay**: Click "Pay Now" on the order card.
    - _Result_: Order moves to "Completed" and the cart unlocks.
5.  **Timeout Test**: Create an order but _don't_ pay. Wait 15 seconds.
    - _Result_: Order automatically moves to "Cancelled" and the cart unlocks.

## 📂 Project Structure

```
├── auth/           # Authentication Service
├── client/         # React Frontend
├── expiration/     # Order timeout management
├── orders/         # Order management & Saga coordinator
├── payments/       # Payment processing
├── products/       # Product catalog & inventory
```
