import { PostItem } from './PostItem';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

const DisplayPosts = ({ posts, loading }) => {
  return (
    <>
      <List className='glass' sx={{ padding: '0', borderRadius: '10px' }}>
        {posts &&
          Object.values(posts).map(post => [
            <PostItem post={post} key={post.id} />,
            <Divider key={post.id + 'divider'} />
          ])}
        {loading && (
          <CircularProgress
            sx={{ display: 'block', margin: 'auto', marginTop: '20px' }}
          />
        )}
        {posts.length < 1 && !loading && (
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', marginTop: '20px' }}
          >
            No posts yet
          </Typography>
        )}
      </List>
    </>
  );
};

export default DisplayPosts;
