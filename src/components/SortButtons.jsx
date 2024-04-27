import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';

const SortButtons = ({ posts, setDisplayPosts }) => {
  const [sortBy, setSortBy] = useState('time');
  const getLikesCount = (likesObj) => {
    return likesObj ? Object.keys(likesObj).length : 0;
};
  useEffect(() => {
    if(!posts) return;
    if (sortBy === 'time') {
      setDisplayPosts([...posts].sort((a, b) => b.timestamp - a.timestamp));
    } else {
      setDisplayPosts([...posts].sort((a, b) => getLikesCount(b.likes) - getLikesCount(a.likes)));
    }
  }, [sortBy, posts]);

  return (
    <ButtonGroup aria-label="outlined primary button group" sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <Button variant={sortBy === 'time' ? 'contained' : 'outlined'} onClick={() => setSortBy('time')}>Most Recent</Button>
      <Button variant={sortBy === 'likes' ? 'contained' : 'outlined'} onClick={() => setSortBy('likes')}>Most Liked</Button>
    </ButtonGroup>
  );
};

export default SortButtons;