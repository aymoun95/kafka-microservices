import cors from "cors";
import express from "express";
import { ProductController } from "./controllers/product-controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", ProductController.getAll);

app.listen(3001, () => {
  console.log("Products service listening on port 3001");
});
