import { PostItem } from './PostItem';
import { List, Typography } from '@mui/material';

const DisplayPosts = ({posts}) => {
  

    return (
        <>
          <List  className='glass'>
            {posts && Object.values(posts).map(post => (
              <PostItem post={post}   />
            ))}
            {!posts && <Typography variant="h4">No posts</Typography>}
          </List>
        </>
      );
}

export default DisplayPosts
