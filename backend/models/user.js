import mongoose from 'mongoose';

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  email: String, // User's email address
  password: String, // User's password (hashed for security)
  otp: Number, // OTP for user verification purposes
  topics: [{ type: String }], // An array of topics the user is interested in
});

// Create a model from the schema
export const User = mongoose.model('User', UserSchema);


/**
 * Documentation for User Model
 *
 * Overview:
 * The `User` model represents user entities within a Node.js application, providing a structured way to store,
 * retrieve, and manage user-related data in a MongoDB database. It is defined using Mongoose, a MongoDB object modeling tool
 * designed to work in an asynchronous environment.
 *
 * Schema Details:
 * - `email`: Stores the email address of the user. It's a unique identifier for user accounts.
 * - `password`: Stores the hashed password of the user. It's crucial to hash passwords for security reasons.
 * - `otp`: Stores a One-Time Password for account verification or password reset functionalities.
 * - `topics`: An array that holds strings representing topics of interest to the user. This could be used to customize content or notifications.
 *
 * Usage:
 * This model is essential for user management tasks such as registration, authentication, and profile customization. 
 * Below is an example demonstrating how to create a new user instance and save it to the database.
 *
 * Best Practices:
 * - Ensure `email` field uniqueness within the database to prevent duplicate user accounts.
 * - Never store plain-text passwords. Always use a library like bcrypt to hash passwords before saving them.
 * - Validate user input both on the client-side and server-side to maintain data integrity and security.
 * - Consider adding more fields to the schema or utilizing Mongoose's middleware (pre/post hooks) for tasks like
 *   password hashing or activity logging.
 *
 * The `User` model is foundational for any application feature that involves user data, from authentication to personalized content delivery.
 */
