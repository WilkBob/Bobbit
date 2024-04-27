import { PostItem } from './PostItem';
import { CircularProgress, List, Typography } from '@mui/material';

const DisplayPosts = ({posts}) => {
  

    return (
        <>
          <List  className='glass'>
            {posts && Object.values(posts).map(post => (
              <PostItem post={post} key={post.id}  />
            ))}
            {posts.length < 1 && <CircularProgress sx={{
              display: 'block',
              margin: 'auto',
              marginTop: '20px',
            }}/>}
          </List>
        </>
      );
}

export default DisplayPosts
