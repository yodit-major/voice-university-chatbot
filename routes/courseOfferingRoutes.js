/*etCourseOfferings*/
import express from "express";

import {
    getCourseOfferings,
    getCourseOfferingById,
    createCourseOffering,
    updateCourseOffering,
    deleteCourseOffering
} from "../controllers/courseOfferingController.js";

const router = express.Router();

router.get("/", getCourseOfferings);
router.get("/:id", getCourseOfferingById);
router.post("/", createCourseOffering);
router.put("/:id", updateCourseOffering);
router.delete("/:id", deleteCourseOffering);

export default router;