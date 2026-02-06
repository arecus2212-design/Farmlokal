"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_service_1 = require("../services/auth.service");
const external_service_1 = require("../services/external.service");
const router = (0, express_1.Router)();
// PRODUCTS API
router.get("/products", product_controller_1.fetchProducts);
//OAUTH TOKEN TEST
router.get("/token", async (req, res) => {
    try {
        const token = await (0, auth_service_1.getAccessToken)();
        res.json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Token fetch failed" });
    }
});
// EXTERNAL API CALL
router.get("/external", async (req, res) => {
    try {
        const data = await (0, external_service_1.fetchExternalData)();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "External API failed" });
    }
});
exports.default = router;
//# sourceMappingURL=product.routes.js.map