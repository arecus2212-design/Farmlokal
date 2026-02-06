"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProducts = fetchProducts;
const product_service_1 = require("../services/product.service");
async function fetchProducts(req, res) {
    const products = await (0, product_service_1.getProducts)(req.query);
    res.json(products);
}
//# sourceMappingURL=product.controller.js.map