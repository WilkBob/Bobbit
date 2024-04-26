import { PostItem } from './PostItem';
import { List, Typography } from '@mui/material';

const DisplayPosts = ({posts}) => {
  

    return (
        <>
          <List  className='glass'>
            {posts && Object.values(posts).map(post => (
              <PostItem post={post} key={post.id}  />
            ))}
            {posts.length < 1 && <Typography variant="h4">No posts</Typography>}
          </List>
        </>
      );
}

export default DisplayPosts
