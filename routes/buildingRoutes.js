
import express from "express";

import {
    getAllBuildings,
    getBuildingById,
    getBuildingsByCampus
} from "../controllers/buildingController.js";

const router = express.Router();

router.get("/", getAllBuildings);
router.get("/campus/:campusId", getBuildingsByCampus);
router.get("/:id", getBuildingById);

export default router;