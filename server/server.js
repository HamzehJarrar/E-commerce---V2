import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import init from "./src/routes/index.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());
init(express, app);
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
