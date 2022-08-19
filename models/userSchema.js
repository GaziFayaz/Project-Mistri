import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 25,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 11,
    },
    address: {
      type: String,
      required: true,
      maxlength: 35,
    },
    dateOfBirth: {
      type: Date,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.user_form || mongoose.model("user_form", UserSchema);