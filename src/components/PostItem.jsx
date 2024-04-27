import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export function PostItem({ post }) {
  const navigate = useNavigate();
  const likesCount = post.likes ? Object.keys(post.likes).length : 0;
  const commentsCount = post.comments ? Object.keys(post.comments).length : 0;
  return (
    <ListItem key={post.id} component={Link} to={`/post/${post.id}`} button>
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
              {` — ${post.content}`}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{ display: 'block', marginTop: 1 }}
            >
              {`${likesCount > 0 ? likesCount : 'No'} ${likesCount === 1 ? 'Like' :
            likesCount === 0 ? 'Likes' : 'Likes'
            }, ${commentsCount > 0 ? commentsCount : 'No'
            } ${commentsCount === 1 ? 'Comment' : commentsCount === 0 ? 'Comments' : 'Comments'}`}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}