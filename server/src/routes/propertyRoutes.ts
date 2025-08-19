import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import propertyControllers from "../controllers/propertyControllers";
import multer from "multer";

const router = express.Router();
const controllers = propertyControllers

// multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// routes
router.get("/", controllers.getProperties);
router.get("/:id", controllers.getProperty);
router.post("/", authMiddleware(["manager"]), upload.array("photos"), controllers.createProperty);

export default router;
