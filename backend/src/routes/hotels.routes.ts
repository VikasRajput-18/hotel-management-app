import express from "express";
import {
  searchHotels,
  getHotelDetails,
  createPayment,
  hotelBookings,
} from "../controller/hotels.controller";
import { param } from "express-validator";
const router = express.Router();
import Stripe from "stripe";
import { verifyToken } from "../middleware/auth.middleware";

export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY as string);

router.route("/:hotelId/bookings").post(verifyToken, hotelBookings);

router
  .route("/:hotelId/bookings/payment-intent")
  .post(verifyToken, createPayment);

router
  .route("/search")
  .get(
    [param("id").notEmpty().withMessage("Hotel ID is requried")],
    searchHotels
  );
router.route("/:id").get(getHotelDetails);

export default router;
