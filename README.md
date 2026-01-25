# E-commerce Microservices with Kafka

This project demonstrates a simple microservices architecture for an e-commerce application using Express, TypeScript, and Kafka, all containerized with Docker.

## Architecture

- **Auth Service (Port 3000)**: Handles user signup. Emits `user-created`.
- **Products Service (Port 3001)**: REST API for product catalog.
- **Orders Service (Port 3002)**: Creates orders. Emits `order-created`. Listens for `payment-created` and `expiration-complete`.
- **Payments Service (Port 3003)**: Listens for `order-created`. Provides manual `/pay` endpoint. Emits `payment-created`.
- **Expiration Service**: Listens for `order-created`. Emits `expiration-complete` after a 15-second delay (unless cancelled by payment).
- **Kafka & Kafka UI (Port 8080)**: Event streaming platform and visual management interface.

## Quick Start

1. **Start everything**:

   ```bash
   docker compose up --build -d
   ```

2. **Access the Visual Dashboard**:
   - Kafka UI: [http://localhost:8080](http://localhost:8080)
   - Storefront (Web Client): [http://localhost:5173](http://localhost:5173) (requires manual start, see below)

## Running the Web Client

The React client is not containerized to allow for easier development (Hot Module Replacement).

```bash
cd client
npm install
npm run dev
```

## Simulation Scenarios

### 1. Order Timeout (Expired)

1. In the UI, click **Buy Now**.
2. Wait 15 seconds without paying.
3. Observe the status change from **CREATED** to **CANCELLED**.

### 2. Successful Payment

1. In the UI, click **Buy Now**.
2. Immediately click the green **Pay Now** button.
3. Observe the status change to **COMPLETED**. The expiration timer is automatically cancelled.

## API Reference (Internal)

- **Auth**: `POST /api/users/signup`
- **Products**: `GET /api/products`
- **Orders**: `POST /api/orders`, `GET /api/orders`
- **Payments**: `POST /api/payments/pay`
