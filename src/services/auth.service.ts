import { redis } from "../config/redis";

const TOKEN_KEY = "oauth_token";
const LOCK_KEY = "oauth_lock";

export async function getAccessToken(): Promise<string> {
  // 1️⃣ Check cached token
  const cachedToken = await redis.get(TOKEN_KEY);
  if (cachedToken) {
    console.log("Using cached token");
    return cachedToken;
  }

  // 2️⃣ Acquire lock
  const lock = await redis.set(
    LOCK_KEY,
    "1",
    "EX",
    5,
    "NX"
  );

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
    await redis.set(
      TOKEN_KEY,
      token,
      "EX",
      expiresIn - 60
    );

    return token;
  } finally {
    await redis.del(LOCK_KEY);
  }
}


