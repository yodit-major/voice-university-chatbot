
import express from "express";

import {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram
} from "../controllers/programController.js";

const router = express.Router();

router.get("/", getAllPrograms);
router.get("/:id", getProgramById);
router.post("/", createProgram);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;