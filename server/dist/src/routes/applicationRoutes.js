"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const applicationControllers_1 = __importDefault(require("../controllers/applicationControllers"));
const router = express_1.default.Router();
const controllers = applicationControllers_1.default;
// routes
router.get("/", (0, authMiddleware_1.authMiddleware)(["manager", "tenant"]), controllers.listApplications);
router.post("/", (0, authMiddleware_1.authMiddleware)(["tenant"]), controllers.createApplication);
router.put("/:id/status", (0, authMiddleware_1.authMiddleware)(["manager"]), controllers.updateApplicationStatus);
exports.default = router;
