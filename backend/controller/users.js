import { User } from "../models/user.js";
import bcrypt from "bcrypt";

// The signin function is responsible for authenticating a user based on email and password.
const signin = (req, res) => {
  // Attempt to find a user with the provided email address.
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If no user is found with the email, send a response indicating the user was not found.
      if (!user) {
        res.status(200).send({ code: 200, message: "User not found" });
      } else {
        // Compare the provided password with the hashed password stored in the database.
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          // If there's an error during comparison, or if the passwords don't match, indicate incorrect password.
          if (err || !result) {
            res.status(200).send({
              code: 200,
              message: "Incorrect password",
              providedPassword: req.body.password, // Including providedPassword in the response is not a good practice for production.
            });
          } else {
            // If the password matches, respond with user information, including any topics they've selected and a placeholder token.
            res.status(200).send({
              userId: user._id,
              email: user.email,
              topics: user.topics,
              code: 200,
              message: "User signed in",
              token: "saurav token", // Placeholder for an actual authentication token.
            });
          }
        });
        console.log(_id)
      }
    })
    .catch((err) => {
      // Handle any errors during the process with a generic internal server error message.
      res.status(500).send({ code: 500, message: "Internal server error" });
    });
};

export { signin };

/**
 * Documentation for Signin Function
 *
 * Overview:
 * The `signin` function facilitates user authentication for a Node.js application using Express.js and Mongoose.
 * It checks the user's credentials (email and password) against the database and returns a response indicating the success or failure of the sign-in attempt.
 *
 * Process Flow:
 * 1. Receives user credentials (email and password) via the request body.
 * 2. Attempts to find a user in the database with the matching email.
 * 3. If a user is found, bcrypt is used to compare the provided password with the stored hash.
 * 4. Depending on the result of the password comparison, responds either with user details and a success message or an error message.
 *
 * Error Handling:
 * - Responds with "User not found" if no matching email is found in the database.
 * - Responds with "Incorrect password" if the password comparison fails.
 * - Catches and handles any errors that occur during database querying or password comparison.
 *
 * Usage:
 * Attach the `signin` function to an Express.js route to handle POST requests for user sign-in. Ensure the client sends 'email' and 'password' in the request body.
 *
 * Example Route Setup:
 * ```javascript
 * const express = require('express');
 * const router = express.Router();
 * const { signin } = require('./path/to/signin');
 *
 * router.post('/login', signin);
 *
 * module.exports = router;
 * ```
 *
 * Security Notes:
 * - Ensure HTTPS is used for all requests to protect sensitive information in transit.
 * - Do not include sensitive information in responses, such as the provided password.
 * - Use a secure method for generating and validating authentication tokens (the placeholder token should be replaced with a JWT or similar token).
 *
 * This function is an essential part of the backend's authentication system, enabling users to securely sign in and access features of the application.
 */
