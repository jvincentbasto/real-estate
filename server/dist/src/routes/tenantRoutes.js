"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tenantControllers_1 = __importDefault(require("../controllers/tenantControllers"));
const router = express_1.default.Router();
const controllers = tenantControllers_1.default;
// routes
router.post("/", controllers.createTenant);
router.get("/:cognitoId", controllers.getTenant);
router.put("/:cognitoId", controllers.updateTenant);
router.get("/:cognitoId/current-residences", controllers.getCurrentResidences);
router.post("/:cognitoId/favorites/:propertyId", controllers.addFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", controllers.removeFavoriteProperty);
exports.default = router;
