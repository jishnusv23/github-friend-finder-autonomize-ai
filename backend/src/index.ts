import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
config();
const app: Application = express();
const PORT: number = Number(process.env.PORT);

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT} 👽`)
})