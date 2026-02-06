import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "../config/redis";
import { Request, Response, NextFunction } from "express";

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await rateLimiter.consume(req.ip!);
    next();
  } catch {
    res.status(429).json({
      message: "Too Many Requests",
    });
  }
};
