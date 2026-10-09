
import express from "express";

import {
    getAllDormitoryFacilities,
    getDormitoryFacilityById,
    getFacilitiesByDormitory
} from "../controllers/dormitoryFacilityController.js";

const router = express.Router();

router.get("/", getAllDormitoryFacilities);
router.get("/dormitory/:dormitoryId", getFacilitiesByDormitory);
router.get("/:id", getDormitoryFacilityById);

export default router;