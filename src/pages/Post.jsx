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

  const fetchPost = async () => {
    const post = await getPost(id);
    setPost(post);
  };

  const handleEdit = async (id, title, content, image) => {
    const editResult = await updatePost(id, title, content, image || null);
    console.log('Edit result:', editResult);
    setPost(null);
    fetchPost();
    
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) {
    return <Typography variant="h4">Post not found</Typography>;
  }

  return (<>
    <PostCard post={post} handleEdit={handleEdit} />
    <CommentBox postId={id} />
    <DisplayComments postId={id} />
  </>
  );
};

export default Post;
