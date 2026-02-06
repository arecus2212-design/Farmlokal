"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
const db_1 = require("../config/db");
const redis_1 = require("../config/redis");
async function getProducts(params) {
    const { limit = 10, cursor = 0, sort = "id", order = "DESC", category, minPrice, maxPrice, search, } = params;
    const cacheKey = JSON.stringify(params);
    // Cache check
    const cached = await redis_1.redis.get(cacheKey);
    if (cached) {
        console.log("Serving from cache");
        return JSON.parse(cached);
    }
    let query = `SELECT * FROM products WHERE id > ?`;
    const values = [cursor];
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
    const [rows] = await db_1.db.query(query, values);
    await redis_1.redis.set(cacheKey, JSON.stringify(rows), "EX", 60);
    return rows;
}
//# sourceMappingURL=product.service.js.map