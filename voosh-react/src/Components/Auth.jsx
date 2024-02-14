
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Store/actions';


const Auth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState()

const handleChange = (e) => {
    setUserData({...userData, [e.target.name]:e.target.value})
    console.log(userData)
}

const pushData = async(data) => {
    try{
        const pushData = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data)
        console.log(pushData.data)
        dispatch(login())
        setTimeout(()=>{
          navigate('/')
        },500)
        localStorage.setItem('accesstoken',pushData.data.access_token)
        localStorage.setItem('refreshtoken',pushData.data.refresh_token)
    }
    catch(err){
        return console.error(err)
    }
}

  const handleLogin = (e) => {
    e.preventDefault()
    pushData(userData)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
          className="block w-full border-gray-300 rounded-md shadow-sm mb-4 px-4 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <input
          type="password"
          placeholder="Password"
          name='password'
          required
          onChange={handleChange}
          className="block w-full border-gray-300 rounded-md shadow-sm mb-4 px-4 py-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <button
          type='submit'
          className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Login
        </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
