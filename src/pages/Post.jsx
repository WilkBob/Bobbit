import { PostCard } from '../components/PostCard';
import { useParams } from 'react-router-dom';
import {  Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPost, updatePost } from '../Firebase/firebaseDB';
import CommentBox from '../components/CommentBox';
import DisplayComments from '../components/DisplayComments';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchPost = async () => {
    const post = await getPost(id);
    setPost(post);
    setLoading(false);
  };

  const handleEdit = async (id, title, content, userImage, image) => {
    const editResult = await updatePost(id, title, content, userImage, image);
    console.log('Edit result:', editResult);
    setPost(null);
    setLoading(true);
    fetchPost();
    
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  

  return (<>
    <PostCard post={post} handleEdit={handleEdit} loading={loading} />
    <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
      Comments
    </Typography>
    <CommentBox postId={id} />
    <DisplayComments postId={id} />
  </>
  );
};

export default Post;
