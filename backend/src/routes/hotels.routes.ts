import express from "express";
import { searchHotels, getHotelDetails } from "../controller/hotels.controller";
import { param } from "express-validator";
const router = express.Router();

router
  .route("/search")
  .get(
    [param("id").notEmpty().withMessage("Hotel ID is requried")],
    searchHotels
  );
router.route("/:id").get(getHotelDetails);

export default router;
