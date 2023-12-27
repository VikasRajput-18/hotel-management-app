import { Response, Request } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../lib/token";
import { validationResult } from "express-validator";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "Email already registered",
      });
      return;
    }

    user = await User.create(req.body);

    let token = generateToken(user._id);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

