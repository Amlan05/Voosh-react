import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/actions';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="flex flex-col items-center">
          <img src={userData.avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto my-4" />
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="block w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
