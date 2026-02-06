"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = getAccessToken;
const redis_1 = require("../config/redis");
const TOKEN_KEY = "oauth_token";
const LOCK_KEY = "oauth_lock";
async function getAccessToken() {
    // 1️⃣ Check cached token
    const cachedToken = await redis_1.redis.get(TOKEN_KEY);
    if (cachedToken) {
        console.log("Using cached token");
        return cachedToken;
    }
    // 2️⃣ Acquire lock
    const lock = await redis_1.redis.set(LOCK_KEY, "1", "EX", 5, "NX");
    if (!lock) {
        await new Promise((r) => setTimeout(r, 200));
        return getAccessToken();
    }
    try {
        console.log("Generating new mock token...");
        // 3️⃣ Generate mock token
        const token = "mock_token_" + Date.now();
        const expiresIn = 3600;
        // 4️⃣ Store token in Redis
        await redis_1.redis.set(TOKEN_KEY, token, "EX", expiresIn - 60);
        return token;
    }
    finally {
        await redis_1.redis.del(LOCK_KEY);
    }
}
//# sourceMappingURL=auth.service.js.map