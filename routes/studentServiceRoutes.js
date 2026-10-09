/*getAllStudentServices */
import express from "express";

import {
    getAllStudentServices,
    getStudentServiceById,
    getStudentServicesByCampus,
    searchStudentServices
} from "../controllers/studentServiceController.js";

const router = express.Router();

router.get("/", getAllStudentServices);
router.get("/search", searchStudentServices);
router.get("/campus/:campusId", getStudentServicesByCampus);
router.get("/:id", getStudentServiceById);

export default router;