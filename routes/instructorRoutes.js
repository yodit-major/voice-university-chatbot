const express = require("express");
const router = express.Router();

const instructorController = require("../controllers/instructorController");


router.get("/", instructorController.getAllInstructors);
router.get("/:id", instructorController.getInstructorById);
router.get("/department/:departmentId",instructorController.getInstructorsByDepartment);

export default router;
