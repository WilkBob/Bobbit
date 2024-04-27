import React, { useEffect, useState } from 'react';
import { getCommentsByPost } from '../Firebase/firebaseDB';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const DisplayComments = ({ postId }) => {
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

    useEffect(() => {
        if (comments.length) {
            setSortedComments(sortComments(comments));
        }
    }, [comments]);

    const sortComments = (comments) => {
        return comments.sort((a, b) => b.timestamp - a.timestamp);
    }
   

    return (
        <Box> {loading && <CircularProgress/>}
            {!comments.length && !loading && <Typography variant="body1" sx={{ mt: 2 }}>No comments yet</Typography>}
            {sortedComments.map(comment => (
                <Box key={comment.id} className="glass" sx={{ my: 2, p: 2, borderRadius: 2, display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar sx={{ mr: 2 }} alt={comment.username} src={comment.userImage} />
                    <Box>
                        <Typography variant="subtitle2" gutterBottom component={Link} to={`/user/${comment.userId}`} sx={
                            {
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }
                        
                        }>
                            {comment.username}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {comment.content}
                        </Typography>
                        {comment.imageUrl && <img src={comment.imageUrl} alt="comment" style={{  borderRadius: '4px' }} />}
                        <Typography variant="caption" display="block" gutterBottom>
                            {new Date(comment.timestamp).toLocaleDateString(
                                'en-US',
                                {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }
                            )}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default DisplayComments;