import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:5000/login", { email, password })
        .then((res) => {
          if (res.data.code === 200 && res.data.message === "User signed in") {
            // toast.success("Login successful!");
            navigate("/", { state: { selectedTopics: res.data.topics } });
            // navigate("/",{state:{selectedTopics:}});
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", email);
            localStorage.setItem("topics", res.data.topics);
          } else {
            toast.error("Invalid credentials. Please try again.");
          }
        })
        .catch((err) => {
          toast.error("Invalid credentials. Please try again."); // Show error toast for server errors
        });
    } else {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form."); // Show error toast for form validation errors
    }
  };

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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="col-span-2 h-[55px] rounded-[100px] bg-[#5282ED] text-white text-[18px] font-semibold mt-[30px] cursor-pointer"
          >
            Login
          </button>
        </form>
   
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
