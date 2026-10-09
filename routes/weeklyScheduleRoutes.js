

import express from "express";

import {
    getAllWeeklySchedules,
    getWeeklyScheduleById,
    getWeeklySchedulesByDay
} from "../controllers/weeklyScheduleController.js";

const router = express.Router();

router.get("/", getAllWeeklySchedules);
router.get("/day/:day", getWeeklySchedulesByDay);
router.get("/:id", getWeeklyScheduleById);

export default router;