import express from "express";
import managerControllers from "../controllers/managerControllers";

const router = express.Router();
const controllers = managerControllers

// routes
router.get("/:cognitoId", controllers.getManager);
router.put("/:cognitoId", controllers.updateManager);
router.get("/:cognitoId/properties", controllers.getManagerProperties);
router.post("/", controllers.createManager);

export default router;
