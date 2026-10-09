
import express from "express";

import {
    getCourseSections,
    getCourseSectionById,
    createCourseSection,
    updateCourseSection,
    deleteCourseSection
} from "../controllers/courseSectionController.js";

const router = express.Router();

router.get("/", getCourseSections);
router.get("/:id", getCourseSectionById);
router.post("/", createCourseSection);
router.put("/:id", updateCourseSection);
router.delete("/:id", deleteCourseSection);

export default router;