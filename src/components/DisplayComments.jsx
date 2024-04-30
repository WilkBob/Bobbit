import  Comment  from './Comment.jsx';
import React, { useContext, useEffect, useState } from 'react';
import {  deleteComment, updateComment } from '../Firebase/Comments.js';
import { Box, Typography,  CircularProgress} from '@mui/material';
import { UserContext } from './context/UserContext';
import SortButtons from './SortButtons.jsx';
import { onValue, ref } from 'firebase/database';
import { db } from '../Firebase/firebaseDB.js';

const DisplayComments = ({ postId }) => {
    const {user, userDetails} = useContext(UserContext)
    const [comments, setComments] = useState([]);
    const [sortedComments, setSortedComments] = useState([]);
    const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const commentsRef = ref(db, `comments/${postId}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
        setComments(Object.values(snapshot.val() || {}));
      setLoading(false);
    });

    return () => unsubscribe();
}, []);

    

    const handleDelete = async (id, postId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (confirmDelete) {
            await deleteComment(postId, id, user.uid); 
        }
    }

    const handleEdit = async (id, content, image) => {
        if (!content.trim()) return alert('Comment cannot be empty');
        if (content.trim().length < 5) return alert('Comment must be at least 5 characters');
        if (image && image.size > 2000000) return alert('Image must be less than 1MB');
        if (image && !['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) return alert('Image must be a jpeg, png or gif');
        const editResult = await updateComment(content, postId, id, image, userDetails.profileImage || null); 
        console.log('Edit result:', editResult);
    }

    return (
        <Box> {loading && <CircularProgress/>}
        <SortButtons posts={comments} setDisplayPosts={setSortedComments} />
            {!comments.length && !loading && <Typography variant="body1" sx={{ mt: 2 }}>No comments yet</Typography>}
            {sortedComments.map(comment => (
    <Comment key={comment.id} handleEdit={handleEdit} comment={comment} handleDelete={handleDelete}  />
))}
        </Box>
    )
}

export default DisplayComments;