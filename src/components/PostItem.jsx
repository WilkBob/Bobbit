import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import styled from "@mui/system/styled";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Link } from "react-router-dom";

const Image = styled("img")({
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: "5px",
  transition: "transform 0.3s",
  marginRight: 10,
  "&:hover": {
    transform: "scale(1.1)",
  },
});

export function PostItem({ post, first, last }) {
  const likesCount = post.likes ? Object.keys(post.likes).length : 0;
  const commentsCount = post.comments ? Object.keys(post.comments).length : 0;
  return (
    <ListItem
      key={post.id}
      component={Link}
      to={`/post/${post.forumId}/${post.id}`}
      button
      sx={{
        borderTopLeftRadius: first ? 'inherit' : 0,
        borderTopRightRadius: first ? 'inherit' : 0,
        borderBottomLeftRadius: last ? 'inherit' : 0,
        borderBottomRightRadius: last ? 'inherit' : 0,
      }}
    >
      <ListItemAvatar>
        {post.image && <Image src={post.image} />}
      </ListItemAvatar>
      <ListItemText
        primary={post.title}
        secondary={
          <>
            <Typography
              sx={{ display: "inline", marginLeft: 1, marginRight: 1 }}
              component={"span"}
              variant="body2"
              color="text.primary"
            >
              {"u/"}{post.username} <Chip component={"span"} label={post.forumName} size="small" />
            </Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {`${new Date(post.timestamp).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                }
              )} — ${post.content}`}
            </Typography>
          </>
        }
      />
      <Chip
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