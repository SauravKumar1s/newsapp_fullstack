import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// The Signup component allows users to create a new account by providing an email,
// a password, and selecting topics of interest.
const Signup = () => {
  // State variables for user inputs and validation errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Static list of topics a user can choose from
  const topics = [
    "Technology",
    "Science",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
  ];

  const navigate = useNavigate();

  // Updates the email state when the user types in the email input field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Updates the password state when the user types in the password input field
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Adds or removes a topic from the selectedTopics state
  const handleTopicChange = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(
        selectedTopics.filter((selectedTopic) => selectedTopic !== topic)
      );
    } else if (selectedTopics.length < 3) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Handles form submission, including validation and posting data to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:5000/signup", {
          email: email,
          password: password,
          topics: selectedTopics,
        })
        .then((res) => {
          toast.success("Signup successful!", selectedTopics);
          console.log("resss ", selectedTopics);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", email);
          navigate("/", { state: { selectedTopics } });
        })
        .catch(() => {
          toast.error("Signup failed. Please try again.");
        });
    } else {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
    }
  };

  // Validates the form data and returns an object with any errors found
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

    // Topic validation
    if (selectedTopics.length === 0) {
      errors.topics = "Please select at least one topic";
    } else if (selectedTopics.length > 3) {
      errors.topics = "Select up to 3 topics only";
    }

    return errors;
  };

  return (
    <div className="w-full md:w-[410px] sm:h-screen mx-auto my-[126px] px-[20px]">
      <ToastContainer />
      <h1 className="text-[#5282ED] text-[55px] font-normal leading-[68px] text-center">
        Sign Up
      </h1>
      <div className="mt-[40px] w-full">
        <form className="w-full grid grid-cols-2 gap-x-[30px] sm:text-[21px] text-sm font-light">
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
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="col-span-2 relative">
            <label className="text-[#5282ED] font-semibold block mb-2">
              Select up to 3 topics:
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <label key={topic} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => handleTopicChange(topic)}
                    className="form-checkbox rounded-md text-[#5282ED] focus:outline-none focus:ring-2 focus:ring-[#5282ED]"
                  />
                  <span className="ml-2 ">{topic}</span>
                </label>
              ))}
            </div>
            {errors.topics && (
              <p className="text-red-500 text-xs mt-1">{errors.topics}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            value="Sign up"
            className="col-span-2 h-[55px] rounded-[100px] bg-[#5282ED] text-white text-[18px] font-semibold mt-[30px] cursor-pointer"
          >
            Submit
          </button>
        </form>
        <p className="text-[#5282ED] text-sm sm:text-[21px] text-center my-[10px] font-semibold">
          Lost your password?
        </p>

        <p className="text-[#474A52] text-sm sm:text-[21px] text-center">
          Dont have an account?{" "}
          <Link to={"/login"} className="text-[#5282ED] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


/**
 * Documentation for the Signup Component
 * 
 * Purpose:
 * The Signup component is designed for users to create a new account within the application. It captures the user's email, password, and preferences for up to three topics of interest.
 * 
 * Features:
 * - Email and Password Input: Users can input their email and a password for their new account.
 * - Topic Selection: Users can select up to three topics that interest them from a predefined list. This feature is aimed at customizing the user's experience based on their preferences.
 * - Validation: Performs client-side validation for email format, password length, and topic selection to ensure data integrity before submission.
 * - Feedback: Utilizes react-toastify for providing immediate success or error feedback to the user upon form submission.
 * 
 * State Management:
 * - email (string): Stores the user's email address.
 * - password (string): Stores the user's chosen password.
 * - errors (object): Contains any validation errors for display.
 * - selectedTopics (array): Holds the user's selected topics of interest.
 * 
 * Event Handlers:
 * - handleEmailChange: Updates the email state with user input.
 * - handlePasswordChange: Updates the password state with user input.
 * - handleTopicChange: Adds or removes topics from the selectedTopics state.
 * - handleSubmit: Validates the form data and, if valid, submits it to the server. Provides feedback and navigates on success.
 * 
 * Validation Logic:
 * - Checks for a valid email address format.
 * - Ensures the password is at least 6 characters long.
 * - Verifies that between one and three topics are selected.
 * 
 * Styling:
 * - The component uses Tailwind CSS for styling, ensuring a consistent and responsive design that aligns with the application's overall aesthetic.
 * - Validation errors are displayed inline, providing direct feedback for user correction.
 * 
 * Integration:
 * - The component requires a backend API endpoint for handling signup requests ("/signup").
 * - Upon successful signup, user data is stored locally (e.g., token), and the user is redirected, typically to the application's homepage or dashboard.
 * 
 * Usage:
 * <Signup />
 * - The component is intended for use in the signup or registration part of the application flow, accessible to new users who do not have an account.
 * 
 * Note:
 * - The component assumes the existence of a backend service capable of processing signup requests, including email and password storage and topic preference handling.
 * - It's important to ensure that the backend service securely handles and stores user passwords and other sensitive information.
 */
