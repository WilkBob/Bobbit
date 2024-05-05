import React, { useEffect, useState } from 'react'
import DisplayPosts from '../components/DisplayPosts'
import AddPost from '../components/AddPost'
import  Typography  from '@mui/material/Typography';
import SortButtons from '../components/SortButtons';
import { onValue, ref } from 'firebase/database';
import { db } from '../Firebase/firebaseDB';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const forumsRef = ref(db, 'posts');
    const unsubscribe = onValue(forumsRef, (snapshot) => {
      let allPosts = Object.values(snapshot.val() || {}).map(forum => Object.values(forum));
      allPosts = allPosts.flat();
      setPosts(allPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to Bobbit!
      </Typography>
      <Typography sx={{
        
      }} variant="body1" component="h2" align="center" gutterBottom>
        This is a community forum where you can share your thoughts and ideas with others. Feel free to browse, or Sign Up to like, comment, and post! <br/> Right now you're viewing all posts, and you can filter them by clicking the buttons below. Any posts you make will be added to the general forum.
      </Typography>
      <AddPost forumId={'general'}/>
      <SortButtons posts={posts} setDisplayPosts={setDisplayPosts} />
      <DisplayPosts posts={displayPosts} loading={loading}/>
    </>
  )
}

export default Home