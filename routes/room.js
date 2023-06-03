import express from "express";
import { createRoom, updateRoomAvailbility } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyjwt.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/availability/:id", updateRoomAvailbility);

export default router;
