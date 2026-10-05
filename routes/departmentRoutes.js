import { verifyToken } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

import express from "express";
import {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getCoursesByProgram,
    getProgramCourses
} from "../controllers/departmentController.js";
const router = express.Router();

router.get("/departments", getDepartments);

router.get("/department/:id", getDepartmentById);
router.post("/department", verifyToken, requireAdmin, createDepartment);

router.put("/department/:id", verifyToken, requireAdmin, updateDepartment);

router.delete("/department/:id", verifyToken, requireAdmin, deleteDepartment);


router.get("/courses", getCoursesByProgram);
router.get("/program/:id/courses", getProgramCourses);
export default router;