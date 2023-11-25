import express from "express";
const router = express.Router();

import { getAllPurchases, createPurchase} from "../controllers/purchasesController.js";

router.get('/api/purchases', getAllPurchases);
router.post('/api/tickets', createPurchase);

export default router;