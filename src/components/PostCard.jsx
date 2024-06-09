import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "./context/UserContext";
import { deletePost } from "../Firebase/Posts";
import { toggleLike } from "../Firebase/Users";
import PostImage from "./PostImage";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import  Delete  from "@mui/icons-material/Delete";

export function PostCard({ post, handleEdit, loading, setLoading }) {
   
    const navigate = useNavigate();
    const { userDetails } = useContext(UserContext);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState(null);
    const [editedImage, setEditedImage] = useState(null);
    const handleSave = useCallback(() => {
        if (!editedPost.trim()) {
            alert("Post cannot be empty");
            return;
        }
        if (editedPost.trim().length < 10) {
            alert("Post must be at least 10 characters");
            return;
        }
        if (editedImage && editedImage.size > 2000000) {
            alert("Image must be less than 1MB");
            return;
        }
        if (
            editedImage &&
            !["image/jpeg", "image/png", "image/gif"].includes(editedImage.type)
        ) {
            alert("Image must be a jpeg, png or gif");
            return;
        }
    
        handleEdit(
            post.id,
            editedTitle,
            editedPost,
            userDetails?.profileImage || null,
            editedImage ? editedImage : null
        );
        setIsEditing(false);
        editedImage && setEditedImage(null);
    }, [editedPost, editedTitle, editedImage, handleEdit, post.id, userDetails?.profileImage]);
    
    const handleDelete = useCallback(async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) {
            return;
        }
        setLoading(true);
        await deletePost(post.id, post.forumId);
        navigate("/");
    }, [post.id, post.forumId, deletePost, navigate]);

    useEffect(() => {
        if (!post) {
            return;
        }
        setLikesCount(Object.keys(post.likes || {}).length);
        setLiked(userDetails && post.likes && post.likes[userDetails.uid]);
        setEditedPost(post.content);
        setEditedTitle(post.title);
    }, [post, userDetails]);

    if (loading) return <CircularProgress />;

    return (
        <Card sx={{ display: "flex", marginTop: 2, padding: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", marginInline: "auto", width: "95%" }}>
                <CardHeader
                    title={
                        !isEditing ? (
                            <Typography variant="h5" color="text.primary">{post.title}
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
                                </IconButton>
                            </Typography>
                        ) : (
                            <TextField label="Title" value={editedTitle} sx={{ marginBottom: '5px' }} onChange={(e) => setEditedTitle(e.target.value)} />
                        )
                    }
                    subheader={
                        <Chip
                            key="timestampChip"
                            label={new Date(post?.timestamp).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric"
                            }) + (post?.edited ? " (edited)" : "")}
                            color="primary"
                        />
                    }
                />
                <Box key="likesBox" sx={{ display: "flex", alignItems: "center", width: '100%' }}>
                    {userDetails && userDetails.uid === post.userId && (
                        <IconButton color="secondary" onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    )}
                    {userDetails && userDetails.uid === post.userId && (
                        <IconButton  onClick={() => setIsEditing(!isEditing)} >
                            <EditIcon />
                        </IconButton>
                    )}
                    {isEditing && (
                        <IconButton component="label" htmlFor={'upload-button'} >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setEditedImage(e.target.files[0])}
                                style={{ display: "none" }}
                                id="upload-button"
                            />
                            {<PhotoCamera />}
                        </IconButton>
                    )}
                    {isEditing && (
                        <IconButton onClick={handleSave}>
                            <SaveOutlined />
                        </IconButton>
                    )}
                </Box>
                <CardContent sx={{ width: "100%" }}>
                    <Box key="userBox" sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        {post.userImage ? (
                            <Avatar src={post.userImage} />
                        ) : (
                            <Avatar src={<AccountCircleIcon />} />
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
                        <Chip component={Link} to={`/forum/${post.forumId}`} label={post.forumName} size="small" sx={{ marginLeft: 1, cursor: 'pointer' }} />
                    </Box>
                    {post.image && !editedImage && (
                        <PostImage src={post.image} />
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
