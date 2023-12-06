import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = () => {
    axios
      .post("http://localhost:5000/send-otp", {
        email: email,
      })
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data.code === 200) {
            navigate('/otp-verification');
            
        }
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.response.data); 
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Forgot Password?</h2>
      
        <>
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
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
        </>
     
    </div>
  );
};

export default ForgetPassword;
