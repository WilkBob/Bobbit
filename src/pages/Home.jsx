import React, { useEffect, useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'
import AddPost from '../components/AddPost'
import { onValue, ref } from 'firebase/database';
import { db } from '../Firebase/firebaseDB';
import { Typography } from '@mui/material';
import SortButtons from '../components/SortButtons';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    const unsubscribe = onValue(postsRef, (snapshot) => {
      setPosts(Object.values(snapshot.val() || {}));
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
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