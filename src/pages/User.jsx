import { UserCard } from '../components/UserCard';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 
'react-router-dom';
import { getPostsByUser, getUser } from '../Firebase/firebaseDB';
import { Typography, Card, CardContent, Avatar } from '@mui/material';
import DisplayPosts from '../components/DisplayPosts';

const User = () => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [displayUser, setDisplayUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const fetchUser = async () => {
  const user = await getUser(id);
  if (!user) {
    navigate('/404');
  }
  setDisplayUser(user);
  if(user) {
    setLoading(false);
  }
};

const fetchPosts = async () => {
  const posts = await getPostsByUser(id);
  setPosts(posts);
  setLoading(false);
  if(posts) {
    setLoading(false);
  }
}

const sortPosts = (posts) => {
  return posts.sort((a, b) => b.timestamp - a.timestamp);
}

useEffect(() => {   
  fetchUser();
  fetchPosts();
}, [id]);
if (loading) {
    return <Typography>Loading...</Typography>;
}

  return (
    <div>
      <UserCard displayUser={displayUser} />
      <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
        Posts by {displayUser?.username}
      </Typography>
      <DisplayPosts posts={sortPosts(posts)} loading={loading} />
    </div>
  );
}

export default User
