import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    TextField,
    Badge
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ThumbUp from "@mui/icons-material/ThumbUp";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { UserContext } from "./context/UserContext";
import { Link, useNavigate} from "react-router-dom";
import CommentImage from "./CommentImage";
import { toggleCommentLike } from "../Firebase/Comments";
import Stack from '@mui/material/Stack';

const Comment = ({
    comment,
    handleDelete,
    handleEdit 
}) => {
    const {userDetails, user} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.content);
    const [editedImage, setEditedImage] = useState(null);
    const [editedImagePreviewUrl, setEditedImagePreviewUrl] = useState(null);
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const handleLike = async () => {
        if (!user) navigate('/login');
        if (!userDetails) return;
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        await toggleCommentLike(user.uid, comment.id, comment.postId);
    };

    useEffect(() => {
        setLikesCount(Object.keys(comment.likes || {}).length);
        setIsLiked(userDetails && comment.likes && comment.likes[userDetails.uid]);
    }, [comment, userDetails]);

    const handleSave = () => {
        handleEdit(comment.id, editedComment, editedImage || null);
        setIsEditing(false);
    };

    return (
        <Box key={comment.id} className="glass" sx={{
            my: 2,
            p: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'flex-start'
        }}>
            <Avatar sx={{mr: 2}} alt={comment.username} src={comment.userImage} component={Link} to={`/user/${comment.userId}`} />
            <Box sx={{width: '90%'}}>
                <Typography variant="subtitle2" gutterBottom component={Link} to={`/user/${comment.userId}`} sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}>
                    {comment.username}
                </Typography>
                {isEditing ? (
                    <TextField
                        fullWidth
                        multiline
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        sx={{marginBlock: 1}}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    component="label"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {setEditedImage(e.target.files[0]); setEditedImagePreviewUrl(URL.createObjectURL(e.target.files[0]))}}
                                    />
                                    <PhotoCamera/>
                                </IconButton>
                            )
                        }}
                    />
                ) : (
                    <Typography variant="body2" gutterBottom>
                        {comment.content}
                    </Typography>
                )}
                {comment.imageUrl && <CommentImage src={comment.imageUrl} />}
                {isEditing && editedImagePreviewUrl && (
                    <CommentImage src={editedImagePreviewUrl} />
                )}
                <Typography variant="caption" display="block" gutterBottom>
                    {new Date(comment.timestamp).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}{comment.edited && ' (edited)'}
                </Typography>
                <Stack direction="row" spacing={1} sx={{position: 'absolute', top: 5, right: 5}}>
                    {user && user.uid === comment.userId && (
                        <>
                            {isEditing && (
                                <IconButton
                                    color="inherit"
                                    onClick={handleSave}
                                >
                                    <SaveOutlined/>
                                </IconButton>
                            )}
                            <IconButton
                                color='inherit'
                                onClick={() => {setIsEditing(!isEditing); setEditedImagePreviewUrl(null); setEditedImage(null)}}
                            >
                                {isEditing ? <Edit/> : <EditOutlined/>}
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={()=>handleDelete(comment.id, comment.postId)}
                            >
                                <DeleteOutline/>
                            </IconButton>
                        </>
                    )}
                    <IconButton
                        color={isLiked ? 'primary' : 'inherit'}
                        onClick={handleLike}
                        sx={{transition: 'transform 0.3s',
         '&:hover': {
                                transform: 'scale(1.1)'
                        }}}
                    >
                        <Badge badgeContent={likesCount} color="primary">
                        <ThumbUp/>
                        </Badge>
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
}

export default Comment;