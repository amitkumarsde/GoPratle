import express from "express";
import cors from "cors";
import requirementRoutes from "./routes/requirementRoutes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GoPratle API is running");
});

app.use("/api/requirements", requirementRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
