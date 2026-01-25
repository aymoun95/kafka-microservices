import cors from "cors";
import express from "express";
import { connectKafka } from "./config/kafka";
import { AuthController } from "./controllers/auth-controller";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users/signup", AuthController.signup);
app.get("/api/users/currentuser", AuthController.currentUser);

const start = async () => {
  app.listen(3000, () => {
    console.log("Auth service listening on port 3000");
  });

  try {
    await connectKafka();
  } catch (err) {
    console.error("Failed to connect to Kafka:", err);
  }
};

start();
