import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicIdWithFolder } from "../helpers/helpers.js";

/**
 * @DESC Get All User
 * @ROUTE /api/v1/user/all-users
 * @method GET
 * @access public
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json(users);
});
/**
 * @DESC Get Single User
 * @ROUTE /api/v1/user/:id
 * @method GET
 * @access public
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").populate("role");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access private
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Ensure the user can only delete their own account
  if (req.me._id.toString() !== id) {
    return res
      .status(403)
      .json({ message: "You can only delete your own account" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.remove();

  res.status(200).json({ message: `${user.name} deleted successfully` });
});

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @method PUT/PATCH
 * @access private
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Ensure the user can only update their own account
  if (req.me._id.toString() !== id) {
    return res
      .status(403)
      .json({ message: "You can only update your own account" });
  }

  const { name, email } = req.body;

  console.log("Update User Request Body:", email);

  const file = req.file;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If a file is uploaded, upload it to Cloudinary and update
  if (file) {
    try {
      // Upload new profile photo to Cloudinary
      const uploadedPhoto = await cloudUpload(file, "profile_photos");

      // Delete old profile photo from Cloudinary, if it exists
      if (user.profilePhoto) {
        await cloudDelete(findPublicIdWithFolder(user.profilePhoto));
      }

      // Update the user's profile photo with the new one
      user.profilePhoto = uploadedPhoto.url;
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      return res.status(500).json({ message: "Error uploading profile photo" });
    }
  }
  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  res.status(200).json({ message: "User updated successfully", user });
});

/**
 * @DESC Update User Password
 * @ROUTE /api/v1/user/:id/password
 * @method PUT
 * @access private
 */
export const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  // Ensure the user can only update their own password
  if (req.me._id.toString() !== id) {
    return res
      .status(403)
      .json({ message: "You can only update your own password" });
  }

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old password and new password are required" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});

/**
 * @DESC Update Profile Photo
 * @ROUTE /api/v1/user/:id/profile-photo
 * @method PUT
 * @access private
 */
export const updateProfilePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  // Ensure the user can only update their own profile photo
  if (req.me._id.toString() !== id) {
    return res
      .status(403)
      .json({ message: "You can only update your own profile photo" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If a file is uploaded, upload it to Cloudinary and update the user's profile photo
  if (file) {
    try {
      // Upload new profile photo to Cloudinary
      const uploadedPhoto = await cloudUpload(file, "profile_photos");

      // Delete old profile photo from Cloudinary, if it exists
      if (user.profilePhoto) {
        await cloudDelete(findPublicIdWithFolder(user.profilePhoto));
      }

      // Update the user's profile photo with the new one
      user.profilePhoto = uploadedPhoto.url;
      await user.save();

      return res.status(200).json({
        message: "Profile photo updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      return res.status(500).json({ message: "Error uploading profile photo" });
    }
  }

  return res
    .status(400)
    .json({ message: "No profile photo provided to update" });
});
