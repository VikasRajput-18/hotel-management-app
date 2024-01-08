import express from "express";
import { registerUser , getMyDetails } from "../controller/users.controller";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();


router.route("/me").get(verifyToken , getMyDetails)

router.route("/register").post(
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  registerUser
);

export default router;
