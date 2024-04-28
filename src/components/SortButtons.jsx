import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

const SortButtons = ({ posts, setDisplayPosts }) => {
  const [sortBy, setSortBy] = useState('likes');
  const getLikesCount = (likesObj) => {
    return likesObj ? Object.keys(likesObj).length : 0;
  };
  const getPopularityScore = (post) => {
    const likesCount = getLikesCount(post.likes);
    const timeSincePost = (new Date().getTime() - post.timestamp) / 1000;
    return likesCount / timeSincePost;
  };
  useEffect(() => {
    if(!posts) return;
    if (sortBy === 'time') {
      setDisplayPosts([...posts].sort((a, b) => b.timestamp - a.timestamp));
    } else if (sortBy === 'likes') {
      setDisplayPosts([...posts].sort((a, b) => getLikesCount(b.likes) - getLikesCount(a.likes)));
    } else if (sortBy === 'popularity') {
      setDisplayPosts([...posts].sort((a, b) => getPopularityScore(b) - getPopularityScore(a)));
    }
  }, [sortBy, posts]);

  return (
    <ButtonGroup aria-label="outlined primary button group" sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <Button variant={sortBy === 'time' ? 'contained' : 'outlined'} onClick={() => setSortBy('time')}>Recent</Button>
      <Button variant={sortBy === 'likes' ? 'contained' : 'outlined'} onClick={() => setSortBy('likes')}>Most Liked</Button>
      <Button variant={sortBy === 'popularity' ? 'contained' : 'outlined'} onClick={() => setSortBy('popularity')}>Popular</Button>
    </ButtonGroup>
  );
};

export default SortButtons;