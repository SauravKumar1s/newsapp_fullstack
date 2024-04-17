import { User } from "../models/user.js";
import bcrypt from "bcrypt";

// The signup function is an Express.js route handler for user registration.
const signup = (req, res) => {
  // Attempt to find a user with the provided email address.
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If a user with the same email already exists, return a 409 Conflict status.
      if (user) {
        res.status(409).send({
          code: 409,
          message: "User with this email already exists",
        });
      } else {
        // If the user doesn't exist, hash the provided password.
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            // If there's an error hashing the password, return a 500 Internal Server Error status.
            res.status(500).send({
              code: 500,
              message: "Error hashing password",
            });
          } else {
            // Create a new User instance with the hashed password and any other provided details.
            const newUser = new User({
              email: req.body.email,
              password: hashedPassword,
              topics: req.body.topics // Assuming that the user can select topics of interest during signup.
            });

            // Save the new user to the database.
            newUser.save()
            .then((savedUser) => {
              // On successful save, return a 201 Created status with the user's ID.
              res.status(201).send({
                code: 201,
                message: "User created successfully",
                user: savedUser,
                userId: savedUser._id  // Send the user ID as part of the response.
             
              });
              console.log(savedUser._id)
            })
          
            .catch((err) => {
              // If saving the user fails, return a 500 Internal Server Error status.
              res.status(500).send({
                code: 500,
                message: "Error creating user",
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      // If querying the database fails, return a 500 Internal Server Error status.
      res.status(500).send({
        code: 500,
        message: "Service error",
      });
    });
};

export { signup };

/**
 * Documentation for Signup Function
 *
 * Overview:
 * The `signup` function handles the registration of new users in an Express.js application. It checks if a user
 * with the provided email already exists, hashes the user's password, and saves the new user to the MongoDB
 * database using Mongoose.
 *
 * Details:
 * - Email Check: Queries the database for an existing user with the same email. If found, it returns an error response.
 * - Password Hashing: Uses bcrypt to securely hash the user's password before storing it in the database.
 * - User Creation: Creates a new user with the hashed password and provided details, then saves the user to the database.
 *
 * Error Handling:
 * - Returns a 409 Conflict status if a user with the same email already exists.
 * - Returns a 500 Internal Server Error status for errors during password hashing, user creation, or database querying.
 *
 * Usage:
 * - The function should be attached to an Express route that handles POST requests for user registration.
 * - Ensure that the client sends a request with 'Content-Type: application/json' and provides 'email', 'password',
 *   and optionally 'topics' in the request body.
 *
 * Example Route Setup:
 * ```javascript
 * const express = require('express');
 * const router = express.Router();
 * const { signup } = require('./path/to/signup');
 *
 * router.post('/signup', signup);
 *
 * module.exports = router;
 * ```
 *
 * This function is part of the backend's authentication system, allowing new users to register and access
 * features of the application. Proper validation and error handling should be implemented to enhance security
 * and user experience.
 */
