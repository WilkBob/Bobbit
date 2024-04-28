import  Comment  from './Comment.jsx';
import React, { useContext, useEffect, useState } from 'react';
import { getCommentsByPost, deleteComment, updateComment } from '../Firebase/firebaseDB';
import { Box, Typography, Avatar, CircularProgress, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { Delete } from '@mui/icons-material';

const DisplayComments = ({ postId }) => {
    const {user, userDetails} = useContext(UserContext)
    const [comments, setComments] = useState([]);
    const [sortedComments, setSortedComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchComments = async () => {
        const comments = await getCommentsByPost(postId);
        console.log('Fetched comments:', comments); // Add this line
        setComments(comments);
    }

    useEffect(() => {
        fetchComments();
        setLoading(false);
    }, [postId]);

    useEffect(() => {
        setSortedComments(sortComments(comments));
    }, [comments]);

    const sortComments = (comments) => {
        return comments.sort((a, b) => b.timestamp - a.timestamp);
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (confirmDelete) {
            const deleteResult = await deleteComment(id, user.uid, postId); 
            console.log('Delete result:', deleteResult); 
            setComments([]);
            fetchComments(); // re-fetch the comments after deletion
        }
    }

    const handleEdit = async (id, content, image) => {
        const editResult = await updateComment(content, id, image, userDetails.profileImage || null); 
        console.log('Edit result:', editResult);
        setComments([]);
        fetchComments();
    }

    return (
        <Box> {loading && <CircularProgress/>}
            {!comments.length && !loading && <Typography variant="body1" sx={{ mt: 2 }}>No comments yet</Typography>}
            {sortedComments.map(comment => (
    <Comment key={comment.id} handleEdit={handleEdit} comment={comment} handleDelete={handleDelete}  />
))}
        </Box>
    )
}

export default DisplayComments;