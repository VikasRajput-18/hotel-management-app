import express from "express";
import {
  loginUser,
  validateToken,
  logoutUser,
} from "../controller/auth.controller";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth.middleware";

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

router.route("/validate-token").get(verifyToken, validateToken);
router.route("/logout").post(logoutUser);

export default router;
