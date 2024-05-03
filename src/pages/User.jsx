import { UserCard } from '../components/UserCard';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 
'react-router-dom';
import { getPostsByUser, getUser } from '../Firebase/Users';
import { Typography} from '@mui/material';
import DisplayPosts from '../components/DisplayPosts';
import SortButtons from '../components/SortButtons';

const User = () => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [displayUser, setDisplayUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
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
      <SortButtons setDisplayPosts={setDisplayPosts} posts={posts} />
      <DisplayPosts posts={displayPosts} loading={loading} />
    </div>
  );
}

export default User
