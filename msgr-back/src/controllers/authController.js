import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password)
    return res.status(404).json({ message: "All fields are required" });

  // find login user by email
  const loginUser = await User.findOne({ email }).populate("role");

  // user not found
  if (!loginUser) return res.status(404).json({ message: "User not found" });

  // password check
  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  // password check
  if (!passwordCheck)
    return res.status(404).json({ message: "Wrong password" });

  // create access token
  const token = jwt.sign(
    { email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    user: loginUser,
    message: "User Login Successful",
  });
});

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the email is already registered
  const userEmailCheck = await User.findOne({ email });
  if (userEmailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash the password
  const hashPass = await bcrypt.hash(password, 10);

  // Find the default role (e.g., "User")
  let defaultRole = await Role.findOne({ name: "User" });
  if (!defaultRole) {
    // Create a new user with the default role
    defaultRole = await Role.create({ name: "User" });

    if (!defaultRole) {
      return res.status(500).json({ message: "Failed to create default role" });
    }
  }

  // Create a new user with the default role
  const user = await User.create({
    name,
    email,
    password: hashPass,
    role: defaultRole._id,
  });

  res.status(200).json({
    user,
    message: "User created successfully",
  });
});
