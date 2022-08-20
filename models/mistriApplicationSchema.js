import mongoose from "mongoose";

const MistriApplicationSchema = new mongoose.Schema({
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
    required: true,
  },
  expertises: {
    type: [
      {
        key:{
          type: String,
          required:true
        },
        value:{
          type:String,
          required:true
        }
      }
    ],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {timestamps:true});

export default mongoose.models.mistri_form || mongoose.model("mistri_form", MistriApplicationSchema);