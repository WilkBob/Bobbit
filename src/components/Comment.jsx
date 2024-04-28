import React, { useContext, useState } from "react";
import { Box, Typography, Avatar, IconButton, TextField, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { UserContext } from "./context/UserContext";
import { Link } from "react-router-dom";
import CommentImage from "./CommentImage";

const Comment = ({
    comment,
    handleDelete,
    handleEdit // Add this prop to handle editing comments
}) => {
    const {user} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.content);

    const handleSave = () => {
        handleEdit(comment.id, editedComment);
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
            <Avatar sx={{mr: 2}} alt={comment.username} src={comment.userImage} />
            <Box>
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
                    />
                ) : (
                    <Typography variant="body2" gutterBottom>
                        {comment.content}
                    </Typography>
                )}
                {comment.imageUrl && <CommentImage src={comment.imageUrl} />}
                <Typography variant="caption" display="block" gutterBottom>
                    {new Date(comment.timestamp).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}{comment.edited && ' (edited)'}
                </Typography>
                {user && user.uid === comment.userId && (
                    <>
                        <IconButton onClick={() => setIsEditing(!isEditing)} sx={{position: 'absolute', top: 0, right: 50}}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(comment.id)} sx={{position: 'absolute', top: 0, right: 0}}>
                            <Delete />
                        </IconButton>
                        {isEditing && (
                            <Button onClick={handleSave}>
                                Save
                            </Button>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Comment;