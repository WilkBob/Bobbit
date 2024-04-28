import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Chip, Divider } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from "react-router-dom";

export function PostItem({ post }) {
  const likesCount = post.likes ? Object.keys(post.likes).length : 0;
  const commentsCount = post.comments ? Object.keys(post.comments).length : 0;
  return (
    <ListItem key={post.id} component={Link} to={`/post/${post.forumId}/${post.id}`} button 
    
    sx={{
      borderRadius: 'inherit',
    }}>
      <ListItemAvatar>
        {post.image && <Avatar variant="square" src={post.image} />}
      </ListItemAvatar>
      <ListItemText
        primary={post.title}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline', marginLeft: 1 }}
              component={'span'}
              variant="body2"
              color="text.primary"
            >
              {'u/'}{post.username}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {`${new Date(post.timestamp).toLocaleDateString(
                'en-US',
                {
                  month: 'long',
                  day: 'numeric',
                }
              )} — ${post.content}`}
            </Typography>
            
              
            
          </>
        }
      /><Chip
                icon={<ThumbUpIcon />}
                label={likesCount}
                variant="contained"
                size="small"
                sx={{ marginRight: 1 }}
              />
              <Chip
                icon={<CommentIcon />}
                label={commentsCount}
                variant="contained"
                size="small"
              />
      
    </ListItem>
  );
}