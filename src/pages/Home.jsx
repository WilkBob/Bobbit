import React, { useEffect, useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'
import AddPost from '../components/AddPost'
import { getPosts } from '../Firebase/firebaseDB';
import { CircularProgress, Typography } from '@mui/material';
import SortButtons from '../components/SortButtons';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);


  useEffect(() => {
    getPosts().then(posts => {
      if (posts) setPosts(posts);
    });
  }, []);




  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to our site!
      </Typography>
      <Typography variant="body1" component="h2" align="center" gutterBottom>
        Explore the latest posts from our community.
      </Typography>
      <SortButtons posts={posts} setDisplayPosts={setDisplayPosts} />
      <AddPost forumId={'general'}/>
      <DisplayPosts posts={displayPosts}/>
    </>
  )
}

export default Home