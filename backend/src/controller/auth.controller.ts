import { Response, Request } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { generateToken } from "../lib/token";

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
    console.log("email, password", email, password);
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("user", isPasswordMatch);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
    const token = generateToken(user._id);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
