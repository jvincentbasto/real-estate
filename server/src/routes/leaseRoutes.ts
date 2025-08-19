import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import leaseControllers from "../controllers/leaseControllers";

const router = express.Router();
const controllers = leaseControllers

// routes
router.get("/", authMiddleware(["manager", "tenant"]), controllers.getLeases);
router.get("/:id/payments", authMiddleware(["manager", "tenant"]), controllers.getLeasePayments);

export default router;
