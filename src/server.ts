import express from "express";
import dotenv from "dotenv";
import { initDB } from "./schema/author.js";
import blogRoutes from "./routes/blog.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

const connectDB = initDB();

app.use(express.json());
app.use("/api/v1", blogRoutes);

connectDB.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
