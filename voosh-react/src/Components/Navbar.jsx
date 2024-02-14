import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {

  const dispatch = useDispatch();


  const isUserLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link className="text-white font-bold" to="/">Voosh</Link>
      <div>
        {isUserLoggedIn && (
    <Link className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2" to='/profile'>
      Profile
   </Link>
        )}
     
      </div>
    </nav>
  );
};

export default Navbar;
