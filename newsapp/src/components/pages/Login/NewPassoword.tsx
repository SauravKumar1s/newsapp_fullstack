import React, { useState } from 'react';

interface NewPasswordProps {
  
}

const NewPassword: React.FC<NewPasswordProps> = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Set New Password</h2>
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
      <label htmlFor="confirmPassword" className="block mb-2 font-medium">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm new password"
        className="w-full border rounded-md p-2 mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
     
      >
        Save Password
      </button>
    </div>
  );
};

export default NewPassword;
