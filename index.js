import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelRoute from "./routes/hotel.js";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/room.js";
import usersRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/hotels", hotelRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, (err) => {
  if (err) {
    console.log(err);
  } else {
    connect();
    console.log("connected to backend!");
  }
});
