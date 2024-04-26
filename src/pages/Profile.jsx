import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/context/UserContext';

const Profile = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/user/${user.uid}`);
    }, [navigate]);

  return (
    <div>
      Redirecting/...
    </div>
  )
}

export default Profile
