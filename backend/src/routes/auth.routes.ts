import express from "express";
import { loginUser } from "../controller/auth.controller";
import { check } from "express-validator";

const router = express.Router();

router.route("/login").post(
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  loginUser
);

export default router;
