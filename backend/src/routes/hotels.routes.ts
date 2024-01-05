import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { searchHotels } from "../controller/hotels.controller";
const router = express.Router();

router.route("/search").get(searchHotels);

export default router;
