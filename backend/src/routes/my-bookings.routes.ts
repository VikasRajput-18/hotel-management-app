import express from "express";
import { getMyBookings } from "../controller/bookings.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(verifyToken, getMyBookings);

export default router;
