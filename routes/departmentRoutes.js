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


router.post("/department", createDepartment);


router.put("/department/:id", updateDepartment);

router.delete("/department/:id", deleteDepartment);
router.get("/courses", getCoursesByProgram);
router.get("/program/:id/courses", getProgramCourses);
export default router;