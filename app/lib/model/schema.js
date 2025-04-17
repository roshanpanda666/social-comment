import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // fixed spelling from "require"
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
      type: String,
      required: true,
    }
  ],
}, 
{ timestamps: true });

const User = models.User || mongoose.model("User", userSchema);

export default User;
