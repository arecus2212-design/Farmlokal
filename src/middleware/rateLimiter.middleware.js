"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const redis_1 = require("../config/redis");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redis_1.redis,
    points: 10, // 10 requests
    duration: 60, // per 60 seconds
});
const rateLimitMiddleware = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    }
    catch {
        res.status(429).json({
            message: "Too Many Requests",
        });
    }
};
exports.rateLimitMiddleware = rateLimitMiddleware;
//# sourceMappingURL=rateLimiter.middleware.js.map