import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = ({ userId }) => {
  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/user/topics/${userId}`)
      .then(response => {
        setTopics(response.data.topics);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading profile:', err);
        setIsLoading(false);
      });

      console.log(userId)
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`/user/topics/${userId}`, { topics })
      .then(() => setMessage('Profile updated successfully.'))
      .catch(error => {
        console.error('Error updating profile:', error);
        setMessage('Failed to update profile.');
      });
  };

  return (
    <div>
      {isLoading ? <div>Loading...</div> : (
        <>
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Topics of Interest:
              <input type="text" value={topics.join(', ')} onChange={(e) => setTopics(e.target.value.split(', '))} />
            </label>
            <br />
            <button type="submit">Update Profile</button>
          </form>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default EditProfile;
