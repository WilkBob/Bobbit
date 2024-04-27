import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPost } from '../Firebase/firebaseDB';

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

  return (
    <Card sx={{ display: 'flex', marginTop: 2, padding: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
        <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>{post.title}</Typography>
        <Typography variant="body2" component={Link} to={`/user/${post.userId}`} color="text.secondary">
          {`u/${post.username}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">{new Date(post.timestamp).toLocaleString()}</Typography>
        {post.image && <CardMedia component="img" sx={{ maxWidth:'500px', objectFit: 'cover', borderRadius: 1, marginTop: 2 }} image={post.image} alt={post.title} />}
        <CardContent>
          <Typography variant="body2" color="text.primary">{post.content}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Post;
