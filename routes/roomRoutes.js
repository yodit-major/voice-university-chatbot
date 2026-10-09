 /*getRoom*/
 import express from "express";

import { 
    getAllRooms, 
    getRoomById, 
    getRoomsByBuilding, 
    getRoomsByFloor 
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getAllRooms); router.get("/building/:buildingId", getRoomsByBuilding); router.get("/floor/:floor", getRoomsByFloor); router.get("/:id", getRoomById);

export default router;