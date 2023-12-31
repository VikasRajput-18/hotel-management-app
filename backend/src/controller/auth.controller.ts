import { Response, Request } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { generateToken } from "../lib/token";
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

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
    let isPasswordMatch = await bcrypt.compare(password, user.password);
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

export const validateToken = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ user: req.userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  return res.send();
};
