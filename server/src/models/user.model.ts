import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_type: {
      type: String,
      enum: ["individual", "corporate"],
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    company_name: { type: String },
    date_of_incorporation: { type: Date },
    type_of_business: { type: String },
    registration_number: { type: String },
    address: { type: String },
    phone_number: { type: String },
    verified: { type: Boolean, default: false },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
