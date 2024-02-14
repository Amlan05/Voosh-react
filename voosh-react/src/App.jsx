import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import axios from 'axios';
import Auth from './Components/Auth'
import Profile from './Components/Profile'
import HomePage from './Components/Homepage'
import Task from './Components/Task';
import Navbar from './Components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './Store/actions';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const refreshToken = localStorage.getItem('refreshtoken');

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const rerefreshAccessToken = async() => {
    try{
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', {
          "refreshToken": refreshToken
        }
      )
      localStorage.setItem('accesstoken', response.data.access_token)
    }
    catch(err){
      return console.error(err)
    }
  }

  useEffect(() => {

    if (localStorage.getItem('refreshtoken')) {
      dispatch(login())
      rerefreshAccessToken()
    }
  
    else if(!isLoggedIn){
      navigate('/auth')
    }

    console.log(isLoggedIn)
    
  }, []);
  return (

    <>
    <Navbar></Navbar>
    <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/" element={<HomePage />} />
    <Route path='/task' element={<Task/>}/>
    <Route path="/task/:id" element={<Task />} />
    <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
   
    </>

  )
}

export default App
