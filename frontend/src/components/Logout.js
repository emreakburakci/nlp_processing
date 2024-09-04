// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here (e.g., clear tokens, update state)
    setIsLoggedIn(false);
    // remove token from local storage
    localStorage.removeItem('token');
    navigate('/');
  }, [setIsLoggedIn, navigate]);

  return null;
};

export default Logout;