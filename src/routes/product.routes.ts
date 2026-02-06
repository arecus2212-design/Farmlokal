import { Router } from "express";
import { fetchProducts } from "../controllers/product.controller";
import { getAccessToken } from "../services/auth.service";
import { fetchExternalData } from "../services/external.service";

const router = Router();

// PRODUCTS API
router.get("/products", fetchProducts);

//OAUTH TOKEN TEST
router.get("/token", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Token fetch failed" });
  }
});

// EXTERNAL API CALL
router.get("/external", async (req, res) => {
  try {
    const data = await fetchExternalData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "External API failed" });
  }
});

export default router;
