import React, { useEffect, useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'
import AddPost from '../components/AddPost'
import { getPosts } from '../Firebase/firebaseDB';
import { Typography } from '@mui/material';
import SortButtons from '../components/SortButtons';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(posts => {
      if (posts) setPosts(posts);
      setLoading(false);
    });
  }, []);


  return (
    <>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to our site!
      </Typography>
      <Typography variant="body1" component="h2" align="center" gutterBottom>
        Explore the latest posts from our community.
      </Typography>
      <AddPost forumId={'general'}/>
      <SortButtons posts={posts} setDisplayPosts={setDisplayPosts} />
      <DisplayPosts posts={displayPosts} loading={loading}/>
    </>
  )
}

export default Home