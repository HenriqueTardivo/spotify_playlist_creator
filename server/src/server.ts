import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import { AppError } from "./shared/error/AppError";

const app = express();

app.use(router);

app.use(express.json());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error" + err.message,
    });
  }
);

app.listen(3350, () => {
  console.log("🚀 Server started at port 3350");
});
