
import express from "express";

import {
    getAllLibraryServices,
    getLibraryServiceById,
    getServicesByLibrary
} from "../controllers/libraryServiceController.js";

const router = express.Router();

router.get("/", getAllLibraryServices);
router.get("/library/:libraryId", getServicesByLibrary);
router.get("/:id", getLibraryServiceById);

export default router;