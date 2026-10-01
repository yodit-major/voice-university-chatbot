import express from "express";
import pool from "../config/database.js";
import {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/departments", getDepartments);

router.get("/department/:id", getDepartmentById);


router.post("/department", createDepartment);


router.put("/department/:id", updateDepartment);

router.delete("/department/:id", deleteDepartment);

export default router;