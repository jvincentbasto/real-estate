"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const managerControllers_1 = __importDefault(require("../controllers/managerControllers"));
const router = express_1.default.Router();
const controllers = managerControllers_1.default;
// routes
router.get("/:cognitoId", controllers.getManager);
router.put("/:cognitoId", controllers.updateManager);
router.get("/:cognitoId/properties", controllers.getManagerProperties);
router.post("/", controllers.createManager);
exports.default = router;
