import { PostCard } from '../components/PostCard';
import { useNavigate, useParams } from 'react-router-dom';
import {  Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPost } from '../Firebase/firebaseDB';
import CommentBox from '../components/CommentBox';
import DisplayComments from '../components/DisplayComments';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const post = await getPost(id);
    setPost(post);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) {
    return <Typography variant="h4">Post not found</Typography>;
  }

  return (<>
    <PostCard post={post}  />
    <CommentBox postId={id} />
    <DisplayComments postId={id} />
  </>
  );
};

export default Post;
