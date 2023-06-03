import express from "express";
import {
  deleteUser,
  getallUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyjwt.js";

const router = express.Router();

router.get("/verifytoken", verifyToken, (req, res, next) => {
  res.send("hello user");
});

router.get("/verifyuser/:id", verifyUser, (req, res, next) => {
  res.send("hello veried user");
});

router.get("/verifyadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello admin person");
});

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/", verifyUser, getallUser);

router.get("/:id", verifyAdmin, getUser);

export default router;
