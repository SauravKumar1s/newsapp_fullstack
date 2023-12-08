import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 


interface OTPVerificationProps {
  email: string;
  onVerify: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerify,
}) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSumbit = () => {
    console.log(otp, password);

    axios
      .post("http://localhost:5000/sumbit-otp", {
        otp: otp,
        password: password,
      })
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data.code === 200) {
          toast.success("Password updated", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Enter OTP</h2>
      <p className="mb-4">
        An OTP has been sent to {email}. Please check your email.
      </p>
      <label htmlFor="otp" className="block mb-2 font-medium">
        OTP
      </label>
      <input
        type="text"
        id="otp"
        placeholder="Enter OTP"
        className="w-full border rounded-md p-2 mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <label htmlFor="password" className="block mb-2 font-medium">
        New Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter new password"
        className="w-full border rounded-md p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSumbit} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Change Password
      </button>
    </div>
  );
};

export default OTPVerification;
