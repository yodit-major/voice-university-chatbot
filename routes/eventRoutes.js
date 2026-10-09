
import express from "express";

import { getEvents, createEvent } from "../controllers/eventController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/events", getEvents);

router.post(
    "/event",
    verifyToken,
    requireAdmin,
    createEvent
);

export default router;