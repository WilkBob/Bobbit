import React, { useEffect, useState } from 'react'
    import DisplayPosts from '../components/DisplayPosts'
    import AddPost from '../components/AddPost'
    import { getPosts } from '../Firebase/firebaseDB';
    import { Typography } from '@mui/material';

    const Home = () => {
      const [posts, setPosts] = useState([]);
      useEffect(() => {
        getPosts().then(posts => {
          if (posts) setPosts(posts);
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
          <DisplayPosts posts={posts}/>
        </>
      )
    }

    export default Home