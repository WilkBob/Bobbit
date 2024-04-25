import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPost } from '../Firebase/firebaseDB';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
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

  return (
    <Card sx={{ maxWidth: 1000, margin: 'auto', marginTop: 5, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
        <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>{post.title}</Typography>
        {post.image && <CardMedia component="img" sx={{ width: '90%', objectFit: 'cover', borderRadius: 1, marginTop: 2 }} image={post.image} alt={post.title} />}
        <CardContent>
          <Typography variant="body2" color="text.secondary">{post.content}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Post;