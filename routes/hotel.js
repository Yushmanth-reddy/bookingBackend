import express from "express";
import {
  countHotelbyCity,
  countHotelbyType,
  createHotel,
  deleteHotel,
  getallHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyjwt.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/", getallHotels);

router.get("/find/:id", getHotel);

router.get("/countbycity", countHotelbyCity);

router.get("/countbytype", countHotelbyType);
router.get("/room/:id", getHotelRooms);

export default router;
