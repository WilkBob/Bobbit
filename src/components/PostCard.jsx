import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    Box,
    Typography,
    Chip,

    IconButton,
    Avatar,
    TextField,
    Button,
    CircularProgress,
    Badge
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "./context/UserContext";
import { deletePost } from "../Firebase/Posts";
import { toggleLike } from "../Firebase/Users";
import PostImage from "./PostImage";
import { Collections, Delete } from "@mui/icons-material";

export function PostCard({ post, handleEdit, loading }) {
    const navigate = useNavigate();
    const { userDetails } = useContext(UserContext);
    const [likesCount, setLikesCount] = useState(
        0
    );
    const [liked, setLiked] = useState(
        false
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState(null);
    const [editedImage, setEditedImage] = useState(null);

    const handleSave = () => {
        handleEdit(post.id, editedTitle, editedPost, userDetails.profileImage || null, editedImage? editedImage : null);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) {
            return;
        }
       await deletePost(post.id, post.forumId);
       navigate('/');
    }

    useEffect(() => {
        if (!post) {
            return;
        }
        setLikesCount(Object.keys(post.likes || {}).length);
        setLiked(userDetails && post.likes && post.likes[userDetails.uid]);
        setEditedPost(post.content);
        setEditedTitle(post.title);

    }, [post, userDetails]);

    if(loading) return (<CircularProgress/>);

    return (
        <Card sx={{ display: "flex", marginTop: 2, padding: 2 }}>
            
          <Box sx={{ display: "flex", flexDirection: "column", marginInline: "auto", width:'95%'}}>
            <CardHeader
                    title={
                        !isEditing ? (post?.title) : (
                            <TextField label='Title' value={editedTitle} sx={{marginBottom: '5px'}} onChange={(e) => setEditedTitle(e.target.value)} />
                        )
                    }
            
                    subheader={
                        <Chip
                            key="timestampChip"
                            label={new Date(post.timestamp).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            }) + (post?.edited ? ' (edited)' : '')}
                            color="primary"
                        />
                    }
                />
                <Box key="likesBox" sx={{ display: "flex", alignItems: "center", width: '100%'}}>
                           
                            <IconButton
                                
                                onClick={async () => {
                                    if (!userDetails) {
                                        navigate("/login");
                                    }
                                    await toggleLike(userDetails.uid, post.id, post.forumId);
                                    setLiked(!liked);
                                    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
                                }}
                            >
                                <Badge badgeContent={likesCount} color="primary">
                                <ThumbUpIcon color={liked ? "primary" : "inherit"} />
                                </Badge>
                            </IconButton>{userDetails && userDetails.uid === post.userId && (
                                <IconButton color="secondary" onClick={handleDelete}>
                                    <Delete />
                                </IconButton>
                            )}
                            {userDetails && userDetails.uid === post.userId && (
                                <IconButton color={isEditing ? 'success' : 'inherit'} onClick={() => setIsEditing(!isEditing)} >
                                    <EditIcon />
                                </IconButton>
                            )}
                            {isEditing && (
                    <IconButton component="label" htmlFor={'upload-button'} sx={{ marginBottom: 1 }}>
                    <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditedImage(e.target.files[0])}
                            style={{ display: "none" }}
                            id="upload-button"
                        />
                        {<Collections/>}
                    </IconButton>
                    )}
                        </Box>
                <CardContent sx={
                    {
                        width: "100%",
                    }
                }>
                
                <Box key="userBox" sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        {post.userImage ? (
                            <Avatar src={post.userImage} />
                        ) : (
                            <AccountCircleIcon />
                        )}
                        <Typography
                            variant="body2"
                            component={Link}
                            to={`/user/${post.userId}`}
                            color="text.secondary"
                            sx={{ marginLeft: 1 }}
                        >
                            {`u/${post.username}`}
                        </Typography>
                    </Box>
                    
                    {post.image && !editedImage && (
                        <PostImage src={post.image}/>
                    )}
                    {editedImage && isEditing && (
                        <PostImage src={URL.createObjectURL(editedImage)} />
                    )}

                    

                    {isEditing ? (
                        <TextField
                            value={editedPost}
                            onChange={(e) => setEditedPost(e.target.value)}
                            multiline
                            fullWidth
                            label="Content"
                            sx={{ marginRight: 2 }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.primary">
                            {post.content}
                        </Typography>
                    )}
                    {isEditing && (
                        <Button onClick={handleSave} sx={{ marginTop: 1 }}>
                            Save
                        </Button>
                    )}
                    {isEditing && (
                        <Button onClick={() => setIsEditing(false)} sx={{ marginTop: 1 }}>
                            Cancel
                        </Button>
                    )}
                    
                </CardContent>
            </Box>
        </Card>
    );
}