import mongoose from "mongoose";
import { generateWebToken } from "../lib/util.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";
export const signupfun = async (req, res) => {
  const { email, fullname, password, profilepic } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "password must greater than 6" });
  }
  const existinguser = await User.findOne({ email });
  if (existinguser) {
    return res.status(400).json({ message: "email already existed " });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullname,
    email,
    profilepic,
    password: hash,
  });

  if (newUser) {
    generateWebToken(User._id, res);
    await newUser.save();

    return res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilepic: newUser.profilepic,
    });
  }

  return res.salt(400).json({ success: false, message: "invalid user data" });
};
export const loginfun = async (req, res) => {
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });
  if (!isUser) {
    return res
      .status(400)
      .json({
        success: false,
        message: "user name or password is incorrecty ",
      });
  }
  const isCorrect = await bcrypt.compare(password, isUser.password);

  if (!isCorrect) {
    return res
      .status(400)
      .json({
        success: false,
        message: "user name or password is incorrecty ",
      });
  }

  generateWebToken(isUser._id, res);

  return res.status(200).json({
    _id: isUser._id,
    fullname: isUser.fullname,
    email: isUser.email,
    profilepic: isUser.profilepic,
  });
};
export const logoutfun = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "succesfully logout" });
  } catch (error) {
    console.log("error in logout");
    return res.status(500).json({ error: error });
  }
};

export const updatedfun = async (req, res) => {
  try {
    const _id = req.User._id;
    const { profilepic } = req.body;

    if (!profilepic) {
      return res.json({ message: "profile picture is required" });
    }
    const uploader = await cloudinary.uploader.upload(profilepic);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { profilepic: uploader.secure_url },
      { new: true }
    );

    return   req.status(200).json({ message: "uploaded successfully" });
  } catch (error) {
    console.log(`error in :${error.message}`);
   return  res.status(500).json({ message: "Internal server error" });
  }
};


export const checkfun = (req, res) => {
  try {
    const isAuthenticated = req.user;
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    return res.status(200).json({
      success: true,
      message: "Device is authenticated",
      user: req.user,
    });
  } catch (error) {
    console.error("Check auth error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
