import  Comment  from './Comment.jsx';
import React, { useContext, useEffect, useState } from 'react';
import { getCommentsByPost, deleteComment, updateComment } from '../Firebase/Comments.js';
import { Box, Typography, Avatar, CircularProgress, IconButton } from '@mui/material';
import { UserContext } from './context/UserContext';
import SortButtons from './SortButtons.jsx';

const DisplayComments = ({ postId }) => {
    const {user, userDetails} = useContext(UserContext)
    const [comments, setComments] = useState([]);
    const [sortedComments, setSortedComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchComments = async () => {
        const comments = await getCommentsByPost(postId);
        setComments(comments);
    }

    useEffect(() => {
        fetchComments();
        setLoading(false);
    }, [postId]);

   

    

    const handleDelete = async (id, postId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (confirmDelete) {
            await deleteComment(postId, id, user.uid); 
            setComments([]);
            fetchComments(); 
        }
    }

    const handleEdit = async (id, content, image) => {
        const editResult = await updateComment(content, postId, id, image, userDetails.profileImage || null); 
        console.log('Edit result:', editResult);
        setComments([]);
        fetchComments();
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