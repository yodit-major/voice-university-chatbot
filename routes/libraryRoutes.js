/*getAllLibraries*/
import express from "express";

import {
    getAllLibraries,
    getLibraryById,
    getLibrariesByCampus
} from "../controllers/libraryController.js";

const router = express.Router();

router.get("/", getAllLibraries);
router.get("/campus/:campusId", getLibrariesByCampus);
router.get("/:id", getLibraryById);

export default router;