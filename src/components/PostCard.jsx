import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia, Box, Typography, Chip, Icon, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { UserContext } from "./context/UserContext";
import { toggleLike } from "../Firebase/firebaseDB";

export function PostCard({ post }) {
    const {userDetails} = useContext(UserContext);
    const [likesCount, setLikesCount] = useState(Object.keys(post.likes || {}).length);
    const [liked, setLiked] = useState(
        userDetails && post.likes && post.likes[userDetails.uid]
    );
    return (
        <Card sx={{ display: 'flex', marginTop: 2, padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                <CardHeader
                    title={post.title}
                    subheader={[
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountCircleIcon />
                            <Typography variant="body2" component={Link} to={`/user/${post.userId}`} color="text.secondary" sx={{ marginLeft: 1 }}>
                                {`u/${post.username}`}
                            </Typography>
                        </Box>,
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={async () => {
                            if (!userDetails) {
                                return;
                            }
                            await toggleLike(userDetails.uid, post.id);
                            setLiked(!liked);
                            setLikesCount(liked ? likesCount - 1 : likesCount + 1);
                            
                        }}>
                            <ThumbUpIcon sx={{
                                color: liked ? 'primary.main' : 'action',
                            }}/>
                            </IconButton>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginLeft: 1 }}
                            >
                                {` ${likesCount} ${likesCount === 1 ? 'like' : 'likes'}`}
                            </Typography>
                        </Box>,
                        <Chip
                            label={new Date(post.timestamp).toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            color="primary"
                            sx={{ marginLeft: 1 }}
                        />
                    ]}
                />

                <CardContent>
                    {post.image && (
                        <CardMedia
                            component="img"
                            sx={{
                                maxWidth: '500px',
                                objectFit: 'cover',
                                borderRadius: 1,
                                marginTop: 2
                            }}
                            image={post.image}
                            alt={post.title}
                        />
                    )}

                    <Typography variant="body2" color="text.primary">
                        {post.content}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}