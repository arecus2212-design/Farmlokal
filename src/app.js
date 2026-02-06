"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const db_1 = require("./config/db");
const redis_1 = require("./config/redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//  Routes
app.use("/", product_routes_1.default);
// Health check 
app.get("/health", (req, res) => {
    res.send("OK");
});
// Test DB connection
db_1.db.query("SELECT 1")
    .then(() => console.log("DB Connected"))
    .catch(console.error);
// Test Redis
redis_1.redis.on("connect", () => {
    console.log("Redis Connected");
});
//  Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map