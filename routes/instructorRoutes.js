
import express from "express";

import {
    getAllInstructors,
    getInstructorById
} from "../controllers/instructorController.js";

const router = express.Router();

// Get all instructors
router.get("/", getAllInstructors);

// Get instructor by ID
router.get("/:id", getInstructorById);

export default router;