import { User } from "../models/user.js";
import nodemailer from "nodemailer";

// Function to send an OTP to a user's email for verification purposes
const sendotp = async (req, res) => {
  console.log(req.body);

  // Generating a 4-digit OTP
  const _otp = (1000 + Math.random() * 9000).toFixed(0);
  console.log(_otp);

  try {
    // Attempting to find the user by their email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ code: 404, message: "User not found" });
    }

    // Setting up nodemailer transport using Gmail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password", // It's safer to use app passwords for 2FA-enabled accounts
      },
      authMethod: "PLAIN",
    });

    // Sending the email with the OTP
    let info = await transporter.sendMail({
      from: "your-email@gmail.com", // Sender address
      to: req.body.email, // Recipient address
      subject: "Your OTP for Verification", // Subject line
      text: _otp.toString(), // OTP in the email body
    });

    // If the email is sent successfully, update the user's OTP in the database
    if (info.messageId) {
      const updatedUser = await User.updateOne({ email: req.body.email }, { otp: _otp });
      res.send({ code: 200, message: "OTP sent successfully", updatedUser });
    } else {
      res.send({ code: 500, message: "Service error" });
    }
  } catch (err) {
    console.error(err);
    res.send({ code: 500, message: "Internal server error" });
  }
};

export { sendotp };

/**
 * Documentation for the sendotp Function
 *
 * Overview:
 * The `sendotp` function is an endpoint in an Express application that sends a One-Time Password (OTP) to a user's email
 * for verification purposes. It leverages the `nodemailer` library to send emails via Gmail and updates the user's record
 * in a MongoDB database with the generated OTP.
 *
 * Prerequisites:
 * - A MongoDB database with a `User` model.
 * - An email account set up for sending emails, preferably with an app password for enhanced security.
 * - The `nodemailer` library installed in the project.
 *
 * Functionality:
 * 1. Generates a 4-digit OTP.
 * 2. Searches for the user in the database using the email provided in the request body.
 * 3. Sets up nodemailer with Gmail credentials.
 * 4. Sends an email to the user with the generated OTP.
 * 5. Updates the user's record in the database with the OTP.
 *
 * Error Handling:
 * - Returns a 404 response if no user is found with the provided email.
 * - Returns a 500 response if there is an error in sending the email or updating the database.
 *
 * Usage:
 * To use this function, it should be connected to an Express route as follows:
 * ```javascript
 * const express = require('express');
 * const { sendotp } = require('./path/to/sendotp');
 * const app = express();
 * 
 * app.post('/send-otp', sendotp);
 * 
 * app.listen(3000, () => console.log('Server running'));
 * ```
 * 
 * Security Note:
 * - Never hard-code sensitive information (like email passwords) directly in the code. Use environment variables or
 *   configuration files to manage such data securely.
 * - Consider implementing rate limiting on this endpoint to prevent abuse of the OTP mechanism.
 */
