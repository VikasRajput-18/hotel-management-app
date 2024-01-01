import express from "express";
import multer from "multer";
import { createMyHotels, getMyHotels } from "../controller/my-hotels.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 5MB
  },
});

router
  .route("/")
  .post(
    verifyToken,
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("city").notEmpty().withMessage("City is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("type").notEmpty().isArray().withMessage("hotel type is required"),
      body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required an muste be a number"),
      body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6),
    createMyHotels
  );


  router.route('/').get(verifyToken , getMyHotels)

export default router;
