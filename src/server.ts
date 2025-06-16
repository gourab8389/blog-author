import express from "express";
import dotenv from "dotenv";
import { initDB } from "./schema/author.js";
import blogRoutes from "./routes/blog.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
