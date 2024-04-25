import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../components/context/UserContext';
import { signOut } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        signOut();
        if (user === null) {
            navigate('/login');
        }
    }, [user, setUser])
  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
