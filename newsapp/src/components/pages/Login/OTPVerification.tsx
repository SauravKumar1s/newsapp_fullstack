import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

// Interface for component props
interface OTPVerificationProps {
  email: string; // Email to which OTP is sent
  onVerify: () => void; // Callback function upon successful OTP verification
}

// OTPVerification component for OTP verification and password update
const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerify,
}) => {
  const [otp, setOtp] = useState(""); // State to hold OTP input by user
  const [password, setPassword] = useState(""); // State to hold new password input by user

  const navigate = useNavigate(); // Hook for programmatically navigating to other routes

  // Function to handle form submission
  const handleSumbit = () => {
    console.log(otp, password); // Logging for debug, can be removed in production

    // Sending POST request to verify OTP and update password
    axios
      .post("http://localhost:5000/sumbit-otp", {
        otp: otp,
        password: password,
      })
      .then((res) => {
        console.log("Response:", res.data); // Logging response, can be removed or used for debugging
        if (res.data.code === 200) {
          // Display success message and navigate to login page
          toast.success("Password updated", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          navigate("/login"); // Redirecting to login page after successful password update
        }
      })
      .catch((error) => {
        console.error(error); // Log error details, can be replaced with user-friendly error message
      });
  };

  // Component's JSX markup for rendering
  return (
    <div className="max-w-md mx-auto mt-8 p-6  h-screen">
      <h2 className="text-2xl mb-4">Enter OTP</h2>
      <p className="mb-4">
        An OTP has been sent to {email}. Please check your email.
      </p>

      {/* OTP input */}
      <label htmlFor="otp" className="block mb-2 font-medium">
        OTP
      </label>
      <input
        type="text"
        id="otp"
        placeholder="Enter OTP"
        className="w-full border rounded-md p-2 mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)} // Update OTP state on change
      />

      {/* New password input */}
      <label htmlFor="password" className="block mb-2 font-medium">
        New Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter new password"
        className="w-full border rounded-md p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state on change
      />

      {/* Submit button */}
      <button onClick={handleSumbit} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Change Password
      </button>
    </div>
  );
};

export default OTPVerification;

// Documentation for OTPVerification Component

/**
 * The `OTPVerification` component is designed to facilitate the OTP (One-Time Password) verification process as part of a password reset or account verification workflow. It allows the user to input an OTP they have received via email and set a new password for their account.
 *
 * ## Props
 * - `email`: String. The email address to which the OTP was sent. This is used to inform the user where to look for the OTP.
 * - `onVerify`: Function. A callback function that is executed upon successful OTP verification. This can be used for further actions in the parent component, such as updating the UI or redirecting the user.
 *
 * ## State
 * - `otp`: String. Holds the value of the OTP input by the user.
 * - `password`: String. Holds the value of the new password input by the user.
 *
 * ## Functionality
 * - The component renders two input fields for the user to enter the OTP and their new password, along with a submission button.
 * - Upon clicking the submission button, the component sends a POST request to a predefined endpoint (`/submit-otp`) with the OTP and new password.
 * - If the verification is successful (indicated by a response code of 200 from the server), the user is shown a success message using `toast` notifications, and they are redirected to the login page.
 * - Error handling is implemented for failed verification attempts, with errors logged to the console. A more user-friendly approach, such as displaying error messages to the user, can be adopted.
 *
 * ## Integration
 * - The component should be integrated into the password reset flow after the user requests an OTP. It requires an active backend endpoint capable of handling OTP verification and password updates.
 * - The `email` prop must be dynamically set based on the user's email address to personalize the instruction message.
 * - The `onVerify` callback can be used for additional logic after successful verification, such as state updates or API calls to fetch user data.
 *
 * ## Styling
 * - Styling is achieved using Tailwind CSS for a consistent and responsive design. The styles can be customized to fit the application's design theme.
 * - The component uses conditional rendering to display error messages, enhancing user feedback and interaction  */