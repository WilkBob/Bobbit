import React from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function PostItem({ post }) {
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
        component={Link}
        to={`/user/${post.userId}`}
        variant="body2"
        color="text.primary"
      >
        {'u/'}{post.username}
      </Typography>
      <Typography variant="body2" component="span"

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
    </>
  }
/>
    </ListItem>
  );
}