import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { updateForum } from '../Firebase/Forums';
import { useState } from 'react';
import Edit from '@mui/icons-material/Edit';
import EditOutlined from '@mui/icons-material/EditOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Save from '@mui/icons-material/Save';
import { UserContext } from './context/UserContext';

const ForumCard = ({ forum, loading }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedForum, setEditedForum] = useState({
        name: forum.name,
        description: forum.description,
    });
    const [editedImage, setEditedImage] = useState(null);
    const [editedImagePreviewUrl, setEditedImagePreviewUrl] = useState(null);
    const { userDetails } = useContext(UserContext);
    const navigate = useNavigate();

    const validateForum = () => {
        if (editedImage && editedImage.size > 2000000) {
            alert('Image must be less than 1MB');
            return false;
        }
        if (editedImage && !['image/jpeg', 'image/png', 'image/gif'].includes(editedImage.type)) {
            alert('Image must be a jpeg, png or gif');
            return false;
        }
        if (editedForum.name.trim().length < 5) {
            alert('Name must be at least 5 characters');
            return false;
        }
        if (editedForum.description.trim().length < 10) {
            alert('Description must be at least 10 characters');
            return false;
        }
        return true;
    };

    const handleEdit = async () => {
        if (!validateForum()) return;
        setIsEditing(false);
        const editResult = await updateForum(forum.id, editedForum.name, editedForum.description, editedImage);
        console.log('Edit result:', editResult);
        window.location.reload();
    };

    const handleInputChange = (event) => {
        setEditedForum({
            ...editedForum,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        setEditedImage(event.target.files[0]);
        setEditedImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Card
                    sx={{
                        position: 'relative',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        '&:hover': {
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        },
                        marginBottom: '10px',
                        opacity: 0.8,
                    }}
                >
                    {forum.image && editedImagePreviewUrl && (
                        <CardMedia
                            sx={{
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: -1,
                                overflow: 'hidden',
                                opacity: 0.1,
                            }}
                            component="img"
                            image={editedImagePreviewUrl}
                            alt={forum.name}
                        />
                    )}
                    {forum.image && !editedImagePreviewUrl && (
                        <CardMedia
                            sx={{
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: -1,
                                overflow: 'hidden',
                                opacity: 0.1,
                            }}
                            component="img"
                            image={forum.image}
                            alt={forum.name}
                        />
                    )}
                    <CardContent>
                        {forum.ownerId === userDetails?.uid && (
                            <IconButton
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                    setEditedForum({
                                        name: forum.name,
                                        description: forum.description,
                                    });
                                    setEditedImage(null);
                                    setEditedImagePreviewUrl(null);
                                }}
                                color={isEditing ? 'success' : 'inherit'}
                            >
                                {isEditing ? <Edit /> : <EditOutlined />}
                            </IconButton>
                        )}

                        {isEditing && (
                            <IconButton component="label" htmlFor={'uploadbutton'} color={editedImage ? 'success' : 'inherit'}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="uploadbutton"
                                />
                                <PhotoCamera />
                            </IconButton>
                        )}

                        {isEditing && (
                            <IconButton color="success" onClick={handleEdit}>
                                <Save />
                            </IconButton>
                        )}

                        {isEditing ? (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Forum Name"
                                name="name"
                                autoComplete="Forumname"
                                autoFocus
                                value={editedForum.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <Typography variant="h3" component="div">
                                {forum.name}
                            </Typography>
                        )}

                        {isEditing ? (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={editedForum.description}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                {forum.description}
                            </Typography>
                        )}

                        <Typography variant="body2" color="text.secondary">
                            {forum.posts ? Object.keys(forum.posts).length : 0} posts
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Created By: {forum.ownerUsername}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Created At:{' '}
                            {new Date(forum.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) +
                                ' ' +
                                new Date(forum.timestamp).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default ForumCard;
