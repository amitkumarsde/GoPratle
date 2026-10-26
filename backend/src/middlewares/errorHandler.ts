import { NextFunction, Request, Response } from "express";

// Any route not matched gets a JSON 404 instead of an HTML page
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

// Catches errors not handled in the routes, e.g. when the request body is not valid JSON
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", error);
  const status = error.status || 500;
  const message = status === 500 ? "Something went wrong, please try again" : "Invalid request data";
  res.status(status).json({ success: false, message });
};
