
import express from "express";

import {
    getAllAnnouncements,
    getAnnouncementById,
    searchAnnouncements,
    getImportantAnnouncements
} from "../controllers/announcementController.js";

const router = express.Router();


router.get("/", getAllAnnouncements);

// Search announcements
router.get("/search", searchAnnouncements);

// Get important announcements
router.get("/important", getImportantAnnouncements);

// Get announcement by ID
router.get("/:id", getAnnouncementById);

export default router;