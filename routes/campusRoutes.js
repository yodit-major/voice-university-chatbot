<<<<<<< HEAD

=======
>>>>>>> c88c76b (Add university information management controllers and routes)
import express from "express";

import {
    getAllCampuses,
    getCampusById,
    getCampusesByUniversity
} from "../controllers/campusController.js";

const router = express.Router();

router.get("/", getAllCampuses);

router.get("/university/:universityId", getCampusesByUniversity);

router.get("/:id", getCampusById);

export default router;

