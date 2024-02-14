
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const SplashScreen = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const isLoggedIn = useSelector(state => state.isLoggedIn);

    if (isLoggedIn) {
      navigate('/dashboard'); 
    } else {
        navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="splash-screen">
      <h1>Loading...</h1>
    </div>
  );
};

export default SplashScreen;
