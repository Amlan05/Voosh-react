import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/actions';
import axios from 'axios';

const Profile = () => {

  const navigate = useNavigate()
  const accesstoken = localStorage.getItem("accesstoken")
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch();

  useEffect(()=>{

   
      const profileData = async() => {
        try{
          const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              Authorization: `Bearer ${accesstoken}`
            }
          });
          console.log(response.data)
          setUserData(response.data)
        }
        catch(err){
          return console.error(err)
        }
      }
      profileData();
    
  
}, [])

  const handleLogout = () => {
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('refreshtoken')
    dispatch(logout())
    navigate('/auth')
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <img src={userData.avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto my-4" />
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
