import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp : Number,
  topics: [String]
});

export const User = mongoose.model('User', UserSchema);
