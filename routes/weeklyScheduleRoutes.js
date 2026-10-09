const express = require("express");
const router = express.Router();

const weeklyScheduleController = require(
    "../controllers/weeklyScheduleController"
);

router.get("/", weeklyScheduleController.getAllSchedules);

router.get("/day/:day", weeklyScheduleController.getSchedulesByDay);

router.get("/:id", weeklyScheduleController.getScheduleById);

export default router;

