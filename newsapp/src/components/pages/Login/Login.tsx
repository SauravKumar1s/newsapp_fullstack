import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify
import { useNavigate } from "react-router-dom";

// Login component definition
const Login = () => {
  // State hooks for email, password, and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Hook to programmatically navigate user after login
  const navigate = useNavigate();

  // Updates the email state based on user input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Updates the password state based on user input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(); // Validates the form inputs

    // If there are no validation errors, proceed to make the login request
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:5000/login", { email, password }) // Makes a POST request to login endpoint
        .then((res) => {
          if (res.data.code === 200 && res.data.message === "User signed in") {
            navigate("/", { state: { selectedTopics: res.data.topics } }); // Navigates to home page on successful login
            // Storing user data in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", email);
            localStorage.setItem("topics", JSON.stringify(res.data.topics));
          } else {
            toast.error("Invalid credentials. Please try again."); // Shows error toast for invalid credentials
          }
        })
        .catch((err) => {
          toast.error("Server error. Please try again later."); // Shows error toast for server errors
        });
    } else {
      setErrors(validationErrors); // Sets form validation errors
      toast.error("Please fix the errors in the form."); // Shows error toast for form validation errors
    }
  };

  // Validates email and password inputs
  const validateForm = () => {
    let errors = {};
    
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Basic password validation
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  // JSX structure for the login form
  return (
    <div className="w-full md:w-[410px] h-screen mx-auto mt-[60px] px-[20px]">
      <ToastContainer />
      <h1 className="text-[#5282ED] text-[55px] font-normal leading-[68px] text-center">
        Login
      </h1>
      <div className="mt-[40px] w-full">
        <form
          className="w-full grid grid-cols-2 gap-x-[30px] sm:text-[21px] text-sm font-light"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <div className="col-span-2 relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`border-[2px] border-[#BEBEBE] w-full rounded-[100px] h-[55px] focus:outline-secondary pl-[3rem] pr-[15px] my-[30px] ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p> // Displays email validation error
            )}
          </div>

          {/* Password Input */}
          <div className="col-span-2 relative">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`border-[2px] border-[#BEBEBE] w-full rounded-[100px] h-[55px] focus:outline-secondary pl-[3rem] pr-[15px] my-[30px] ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p> // Displays password validation error
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="col-span-2 h-[55px] rounded-[100px] bg-[#5282ED] text-white text-[18px] font-semibold mt-[30px] cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Navigation Links */}
        <p className="text-[#474A52] text-sm sm:text-[21px] text-center mt-2">
          Dont have an account?{" "}
          <Link to={"/signup"} className="text-[#5282ED] font-semibold">
            Sign up
          </Link>
        </p>
        <Link to={"/forget-password"} className="text-[#5282ED] font-semibold">
          Forget password
        </Link>
      </div>
    </div>
  );
};

export default Login;



// Documentation for Login Component

/**
 * The `Login` component is designed for user authentication. It renders a login form where users can enter their email and password. Upon form submission, it performs a POST request to a predefined login API endpoint. If the authentication is successful, the user is redirected to the home page and their token, email, and topics are stored in localStorage. If the authentication fails due to invalid credentials or server errors, appropriate error messages are displayed using toast notifications.
 *
 * ## Usage
 * This component is intended to be used on the login page of an application that requires user authentication.
 *
 * ## Features
 * - Email and Password input with basic validation.
 * - POST request to the server for authentication.
 * - Redirects to the home page on successful login.
 * - Local storage management for user token, email, and topics.
 * - Toast notifications for errors and validation feedback.
 * - Link to the signup page and password recovery.
 *
 * ## Dependencies
 * - axios: For making HTTP requests.
 * - react-toastify: For displaying toast notifications.
 * - react-router-dom: For navigation and linking to other pages.
 *
 * ## State Management
 * - email: Stores the email input by the user.
 * - password: Stores the password input by the user.
 * - errors: Object that captures and displays input validation errors.
 *
 * ## Functions
 * - handleEmailChange: Updates the email state based on user input.
 * - handlePasswordChange: Updates the password state based on user input.
 * - handleSubmit: Validates the form inputs and performs the login action by sending a request to the server.
 * - validateForm: Performs basic validation for email and password inputs and returns any errors found.
 *
 * ## Styling
 * This component uses Tailwind CSS for styling. The styles are applied through class names specified in the JSX. The design is responsive, with adjustments for different screen sizes.
 *
 * ## Security Considerations
 * - The component includes basic front-end validation for the email and password fields. However, it is crucial to handle authentication securely on the server side, including proper storage of passwords and the use of tokens for session management.
 * - Storing sensitive information like tokens in localStorage is convenient for a demo or simple applications, but for production applications, consider more secure storage options or mechanisms to manage authentication states.
 */
