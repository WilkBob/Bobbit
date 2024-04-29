import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';






const ForumCard = ({ forum, loading }) => {
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Card sx={{
                    position:'relative',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
                    transition: '0.3s',
                    '&:hover': {
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    },
                    marginBottom: '10px',
                    opacity: 0.8,
                }}>
                    {forum.image && (
                        <CardMedia
                        sx={{
                            height: '200px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            position:'absolute',
                            top:0,
                            left:0,
                            zIndex:-1,
                            overflow:'hidden',
                            opacity:0.1,
                        }}
                            component="img"
                            image={forum.image}
                            alt={forum.name}
                        />
                    )}
                    <CardContent>
                        <Typography variant="h3" component="div">
                            {forum.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {forum.description}
                        </Typography>
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