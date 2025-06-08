import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    accountStatus: {
      type: String,
      enum: ["Active", "Suspended"],
      default: "Active",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export default mongoose.model("User", userSchema);
