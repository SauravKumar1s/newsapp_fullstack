// Importing necessary dependencies
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ForgetPassword functional component definition
const ForgetPassword: React.FC = () => {
  // State hooks for managing email input and OTP sent status
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // useNavigate hook for programmatically navigating to other routes
  const navigate = useNavigate();

  // Event handler for email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Function to handle OTP sending
  const handleSendOTP = () => {
    // Making a POST request to send OTP to the provided email
    axios
      .post("http://localhost:5000/send-otp", { email: email, })
      .then((res) => {
        console.log("Response:", res.data);
        // If response code is 200, navigate to OTP verification page
        if (res.data.code === 200) {
            navigate('/otp-verification');
        }
        // Set otpSent to true indicating OTP has been sent
        setOtpSent(true);
      })
      .catch((error) => {
        // Log any error encountered during the OTP sending process
        console.error("Error sending OTP:", error.response.data); 
      });
  };

  // JSX for rendering the forget password UI
  return (
    <div className='h-screen'>
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
        <h2 className="text-2xl mb-4">Forgot Password?</h2>
        
        {/* Email input field */}
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full border rounded-md p-2 mb-4"
          value={email}
          onChange={handleEmailChange}
        />

        {/* Button to send OTP */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSendOTP}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

// Exporting ForgetPassword component for use in other parts of the application
export default ForgetPassword;


// Documentation for ForgetPassword Component

/**
 * The `ForgetPassword` component facilitates the process of resetting a user's password by sending an OTP (One-Time Password) to their registered email address. It allows users to enter their email, and upon submission, an OTP is dispatched to the provided email if it exists in the system's records.
 *
 * ## Usage
 * This component should be rendered on the "Forgot Password?" page accessible from the login screen. It serves as the initial step in the password reset process, leading to OTP verification and password update.
 *
 * ## Features
 * - Email input for the user to enter their email address.
 * - Button to send an OTP to the entered email.
 * - Navigates to OTP verification page upon successful OTP dispatch.
 * - Uses axios for making HTTP POST requests to the backend.
 * - React useState hooks for managing component state.
 * - react-router-dom's useNavigate for programmatically navigating to another route.
 *
 * ## State Variables
 * - email (string): The email address entered by the user.
 * - otpSent (boolean): Indicates whether the OTP request has been successfully sent.
 *
 * ## Functions
 * - handleEmailChange: Captures and updates the email input by the user.
 * - handleSendOTP: Validates the email and sends a request to the backend to dispatch an OTP. Upon success, navigates the user to the OTP verification page.
 *
 * ## Dependencies
 * - axios: For sending HTTP requests.
 * - React: Specifically, useState for state management and FC (Functional Component) for component definition.
 * - react-router-dom: For programmatic navigation using useNavigate.
 *
 * ## HTTP Requests
 * - Makes a POST request to "/send-otp" with the user's email. The backend is expected to handle the OTP generation and email dispatch.
 *
 * ## Error Handling
 * - Catches and logs any errors that occur during the OTP dispatch process to the console. It includes handling server-side errors or network issues.
 *
 * ## Styling
 * - Utilizes Tailwind CSS for styling the form and button, ensuring a responsive and modern design. Styling can be customized as needed by modifying the Tailwind classes.
 *
 * ## Security Considerations
 * - Ensure the backend validates the email address before dispatching an OTP to prevent abuse (e.g., rate limiting, verifying email against known users).
 * - The component itself does not directly handle sensitive information, but it initiates a process that involves security measures on the backend.
 *
 * ## Example Usage
 * ```
 * <ForgetPassword />
 * ```
 * Place this component on a page accessible to unauthenticated users who have forgotten their password and need to reset it.
 */
