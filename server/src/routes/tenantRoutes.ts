import express from "express";
import tenantControllers from "../controllers/tenantControllers";

const router = express.Router();
const controllers = tenantControllers

// routes
router.post("/", controllers.createTenant);
router.get("/:cognitoId", controllers.getTenant);
router.put("/:cognitoId", controllers.updateTenant);
router.get("/:cognitoId/current-residences", controllers.getCurrentResidences);
router.post("/:cognitoId/favorites/:propertyId", controllers.addFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", controllers.removeFavoriteProperty);

export default router;
