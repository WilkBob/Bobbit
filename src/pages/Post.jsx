import { PostCard } from '../components/PostCard';
import { useNavigate, useParams } from 'react-router-dom';
import  Typography  from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { updatePost } from '../Firebase/Posts';
import CommentBox from '../components/CommentBox';
import DisplayComments from '../components/DisplayComments';
import { onValue, ref } from 'firebase/database';
import { db } from '../Firebase/firebaseDB';

const Post = () => {
  const { id, forumId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleEdit = async (id, title, content, userImage, image) => {
    const editResult = await updatePost(id, title, content, userImage, forumId, image);
    //console.log('Edit result:', editResult);
  }

  useEffect(() => {
    const postRef = ref(db, `posts/${forumId}/${id}`);
    const unsubscribe = onValue(postRef, (snapshot) => {
      setPost(snapshot.val());
      if (loading){
        setLoading(false);
      }
      if (!snapshot.exists()) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [id]);

  return (<>
    <PostCard post={post} handleEdit={handleEdit} loading={loading} setLoading={setLoading}/>
    <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
      Comments
    </Typography>
    <CommentBox postId={id} forumId={forumId} />
    <DisplayComments postId={id} />
  </>
  );
};

export default Post;