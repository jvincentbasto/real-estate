import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import applicationControllers from "../controllers/applicationControllers";

const router = express.Router();
const controllers = applicationControllers

// routes
router.get("/", authMiddleware(["manager", "tenant"]), controllers.listApplications);
router.post("/", authMiddleware(["tenant"]), controllers.createApplication);
router.put("/:id/status", authMiddleware(["manager"]), controllers.updateApplicationStatus);

export default router;
