"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const propertyControllers_1 = __importDefault(require("../controllers/propertyControllers"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const controllers = propertyControllers_1.default;
// multer
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// routes
router.get("/", controllers.getProperties);
router.get("/:id", controllers.getProperty);
router.post("/", (0, authMiddleware_1.authMiddleware)(["manager"]), upload.array("photos"), controllers.createProperty);
exports.default = router;
