
import express from "express";

import {
    getAllDormitories,
    getDormitoryById,
    getDormitoriesByCampus,
    searchDormitories
} from "../controllers/dormitoryController.js";

const router = express.Router();

router.get("/", getAllDormitories);
router.get("/search", searchDormitories);
router.get("/campus/:campusId", getDormitoriesByCampus);
router.get("/:id", getDormitoryById);

export default router;