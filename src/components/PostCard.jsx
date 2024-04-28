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
    CircularProgress
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "./context/UserContext";
import { deletePost, toggleLike } from "../Firebase/firebaseDB";
import PostImage from "./PostImage";
import { Delete, Image } from "@mui/icons-material";

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
    
    const [editedImage, setEditedImage] = useState(null);

    const handleSave = () => {
        handleEdit(post.id, post.title, editedPost, userDetails.profileImage || null, editedImage? editedImage : null);
        setIsEditing(false);
    };

    const handleDelete = async () => {
       await deletePost(post.id);
       navigate('/');
    }

    useEffect(() => {
        if (!post) {
            return;
        }
        setLikesCount(Object.keys(post.likes || {}).length);
        setLiked(userDetails && post.likes && post.likes[userDetails.uid]);
        setEditedPost(post.content);
        
    }, [post, userDetails]);

    return (
        <Card sx={{ display: "flex", marginTop: 2, padding: 2 }}>
            {loading && <Box sx={{ display: "flex", flexDirection: "column", marginInline: "auto", width:'100%'}}><CircularProgress/></Box>}
            {!loading &&<Box sx={{ display: "flex", flexDirection: "column", marginInline: "auto", width:'100%'}}>
            <CardHeader
                    title={post.title}
                    action={
                        <Box key="likesBox" sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                onClick={async () => {
                                    if (!userDetails) {
                                        return;
                                    }
                                    await toggleLike(userDetails.uid, post.id);
                                    setLiked(!liked);
                                    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
                                }}
                            >
                                <ThumbUpIcon
                                    sx={{
                                        color: liked ? "primary.main" : "action",
                                    }}
                                />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary">
                                {likesCount}
                            </Typography>
                            {userDetails && userDetails.uid === post.userId && (
                                <IconButton onClick={() => setIsEditing(!isEditing)} sx={{ marginLeft: 1 }}>
                                    <EditIcon />
                                </IconButton>
                            )}
                            {userDetails && userDetails.uid === post.userId && (
                                <IconButton onClick={handleDelete} sx={{ marginLeft: 1 }}>
                                    <Delete />
                                </IconButton>
                            )}
                        </Box>
                    }
                    subheader={
                        <Chip
                            key="timestampChip"
                            label={new Date(post.timestamp).toLocaleString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }) + (post.edited ? " (edited)" : "")}
                            color="primary"
                        />
                    }
                />
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

                    {isEditing && (
                    <IconButton component="label" htmlFor={'upload-button'} sx={{ marginBottom: 1 }}>
                    <input
                            type="file"
                            onChange={(e) => setEditedImage(e.target.files[0])}
                            style={{ display: "none" }}
                            id="upload-button"
                        />
                        {<Image />}
                    </IconButton>
                    )}

                    {isEditing ? (
                        <TextField
                            value={editedPost}
                            onChange={(e) => setEditedPost(e.target.value)}
                            multiline
                            fullWidth
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
            </Box>}
        </Card>
    );
}