import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedTopics, setSelectedTopics] = useState([]);
  const topics = [
    "Technology",
    "Science",
    "Health",
    "Business",
    "Entertainment",
    "Sports",
  ];

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTopicChange = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(
        selectedTopics.filter((selectedTopic) => selectedTopic !== topic)
      );
    } else if (selectedTopics.length < 3) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // sumbit button
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
          navigate("/", { state: { selectedTopics } }); // Pass selected topics to the home page
        })
        .catch((err) => {
          toast.error("Signup failed. Please try again.");
        });
    } else {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length === 0) {
  //     axios
  //       .post("http://localhost:5000/signup", {
  //         email: email,
  //         password: password,
  //         topics: selectedTopics,
  //       })
  //       .then((res) => {
  //         toast.success("Signup successful!");
  //         navigate('/', { state: { selectedTopics } }); // Pass selected topics to the home page
  //       })
  //       .catch((err) => {
  //         toast.error("Signup failed. Please try again.");
  //       });
  //   } else {
  //     setErrors(validationErrors);
  //     toast.error("Please fix the errors in the form.");
  //   }
  // };

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
    <div className="w-full md:w-[410px] h-auto mx-auto my-[126px] px-[20px]">
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
                  <span className="ml-2">{topic}</span>
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
