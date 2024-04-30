import React, { useEffect, useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'
import AddPost from '../components/AddPost'
import { Typography } from '@mui/material';
import SortButtons from '../components/SortButtons';
import { getAllPosts } from '../Firebase/Posts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setLoading(false);
      
    }
    fetchPosts();
  }
  , []);

  const addToDisplay = (post) => {
    setPosts([post, ...posts]);
  }

  return (
    <>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to Bobbit!
      </Typography>
      <Typography sx={{
        
      }} variant="body1" component="h2" align="center" gutterBottom>
        This is a community forum where you can share your thoughts and ideas with others. Feel free to browse, or Sign Up to like, comment, and post! <br/> Right now you're viewing all posts, and you can filter them by clicking the buttons below. Any posts you make will be added to the general forum.
      </Typography>
      <AddPost forumId={'general'} addToDisplay={addToDisplay}/>
      <SortButtons posts={posts} setDisplayPosts={setDisplayPosts} />
      <DisplayPosts posts={displayPosts} loading={loading}/>
    </>
  )
}

export default Home