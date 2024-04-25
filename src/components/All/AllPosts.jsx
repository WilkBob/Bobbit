import React, { useEffect, useState } from 'react'
import { getPosts } from '../../Firebase/firebaseDB';
import AddPost from './AddPost';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts().then(posts => {
            if (posts) setPosts(posts);
            console.log('got posts',posts);
        });
    }, []);

    return (
        <>
          <AddPost/>
          <List>
            {posts && Object.values(posts).map(post => (
              <ListItem key={post.id} component={Link} to={`/post/${post.id}`} button>
                <ListItemAvatar>
                  {post.image && <Avatar variant="square" src={post.image} />}
                </ListItemAvatar>
                <ListItemText
                  primary={post.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component={Link}
                        to={`/user/${post.userId}`}
                        variant="body2"
                        color="text.primary"
                      >
                        {post.username}
                      </Typography>
                      {` — ${post.content}`}
                    </>
                  }
                />
              </ListItem>
            ))}
            {!posts && <Typography variant="h4">No posts</Typography>}
          </List>
        </>
      );
}

export default AllPosts
