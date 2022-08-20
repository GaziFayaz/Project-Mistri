import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema(
  {
    services: {
      type: String,
      required: true,
      maxlength: 25,
    },
  },
  { timestamps: true }
);

export default mongoose.models.services ||
  mongoose.model("services", ServicesSchema);
