import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
}, 
{ timestamps: true });

const User = models.User || mongoose.model("User", userSchema);

export default User;
