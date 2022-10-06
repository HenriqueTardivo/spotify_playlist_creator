import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err) {
      return response.status(500).json({
        status: "error",
        message: "Internal server error" + err.message,
      });
    }
  }
);

app.use(router);

app.listen(3350, () => {
  console.log("🚀 Server started at port 3350");
});
