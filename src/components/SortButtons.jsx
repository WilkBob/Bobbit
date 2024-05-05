import React, { useEffect, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const SortButtons = ({ posts, setDisplayPosts }) => {
  const [sortBy, setSortBy] = useState('likes');
  const getLikesCount = (likesObj) => {
    return likesObj ? Object.keys(likesObj).length : 0;
  };
  const getPopularityScore = (post) => {
    const likesCount = getLikesCount(post.likes);
    const commentsCount = post.comments ? Object.keys(post.comments).length : 0;
    const timeSincePost = (new Date().getTime() - post.timestamp) / 1000;
    const LIKE_WEIGHT = 3;
    const COMMENT_WEIGHT = 4;
    const TIME_WEIGHT = 2;

  
    const totalInteractions = (likesCount * LIKE_WEIGHT) + (commentsCount * COMMENT_WEIGHT);


    const hoursSincePost = timeSincePost / 3600; // 3600 seconds in an hour

  
    const popularityScore = totalInteractions / Math.max(1, hoursSincePost) * TIME_WEIGHT;
    return popularityScore;
    
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