import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Routes } from "./routes";
import sequelize from "./config/database";
import errorHandler from "./middleware/errorHandler";
config();
const app: Application = express();
const PORT: number = Number(process.env.PORT);

app.use(morgan("dev"));
console.log(process.env.FRONTEND_URL, "KKKK");
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use("/api", Routes());
app.use(errorHandler);

//not found api 
app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "API Not found" });
});
  


if (!process.env.DATABASE_URL) {
  throw new Error(
    "PostgreSQL connection string not provided in environment variables"
  );
}


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} 👽`);
  try {
    await sequelize.authenticate();
    console.log("🍃 Successfully connected to PostgreSQL 🍃");
    await sequelize.sync();
    console.log("Database synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); 
  }
});

