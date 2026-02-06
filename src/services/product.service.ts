import { db } from "../config/db";
import { redis } from "../config/redis";

export async function getProducts(params: any) {
  const {
    limit = 10,
    cursor = 0,
    sort = "id",
    order = "DESC",
    category,
    minPrice,
    maxPrice,
    search,
  } = params;

  const cacheKey = JSON.stringify(params);

  // Cache check
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("Serving from cache");
    return JSON.parse(cached);
  }

  let query = `SELECT * FROM products WHERE id > ?`;
  const values: any[] = [cursor];

  if (category) {
    query += ` AND category = ?`;
    values.push(category);
  }

  if (minPrice) {
    query += ` AND price >= ?`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= ?`;
    values.push(maxPrice);
  }

  if (search) {
    query += ` AND name LIKE ?`;
    values.push(`%${search}%`);
  }

  query += ` ORDER BY ${sort} ${order} LIMIT ?`;
  values.push(Number(limit));

  const [rows] = await db.query(query, values);

  await redis.set(cacheKey, JSON.stringify(rows), "EX", 60);

  return rows;
}
