import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import { addComment } from '../Firebase/firebaseDB';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

const CommentBox = ({ postId }) => {
    const {user, userDetails} = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [commentImagePreviewUrl, setCommentImagePreviewUrl] = useState(null);
    const [commenting, setCommenting] = useState(false);

    const handleCommentChange = (event) => {
        if(!commenting) setCommenting(true);
        setComment(event.target.value);
    }

    const handleCommentImageChange = (event) => {
        setCommentImage(event.target.files[0]);
        setCommentImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleRemoveCommentImage = () => {
        setCommentImage(null);
        setCommentImagePreviewUrl(null);
    }

    const handleComment = async () => {
        if (!user) return navigate('/login');
        if (comment.length < 5) {
            alert('Comment must be at least 5 characters');
            return;
        }
        setLoading(true);
        
       const NewComment = await addComment(comment, userDetails.username, user.uid, postId, userDetails.profileImage || null, commentImage);
        setComment('');
        setCommentImage(null);
        setCommentImagePreviewUrl(null);
        setCommenting(false);
        setLoading(false);
        window.location.reload();
    }

    return (
        <Box sx={{ marginBlock: 2 }}>
            <TextField
                variant="outlined"
                multiline
                fullWidth
                rows={commenting && comment.length > 5 ? 3 : 1}
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                component="label"
                            >
                                <PhotoCamera />
                                <input
                                    type="file"
                                    accept='image/*'
                                    hidden
                                    onChange={handleCommentImageChange}
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {commentImagePreviewUrl && (
                <Box sx={{ mt: 2, position: 'relative' }}>
                    <img src={commentImagePreviewUrl} alt="Comment" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                    <IconButton
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={handleRemoveCommentImage}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
            {commenting && comment.length > 5 &&<Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComment}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} /> : 'Post Comment'}
                </Button>
            </Box>}
        </Box>
    );
}

export default CommentBox;