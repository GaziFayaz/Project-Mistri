import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
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
    type: [String],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  certificates: {
    type: [
      {
        certificate: {
          type: String,
          required: true,
        },
      },
    ],
  },
  img: {
    type: String,
    required: true,
  }
}, {timestamps:true});

export default mongoose.model("mistri_form", FormSchema);