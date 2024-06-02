import { PostItem } from './PostItem';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

const DisplayPosts = ({ posts, loading }) => {
  const postValues = posts && Object.values(posts);
  return (
    <>
      <List className='glass' sx={{ padding: '0', borderRadius: '10px' }}>
        {postValues &&
          postValues.map((post, index) => [
            <PostItem post={post} key={post.id} first={
              index === 0
            } last={
              index === postValues.length - 1
            }
             />,
            index !== postValues.length - 1 && <Divider key={`divider-${post.id}`} />
          ])}
        {loading && (
          <CircularProgress
            sx={{ display: 'block', margin: 'auto', marginTop: '20px' }}
          />
        )}
        {postValues.length < 1 && !loading && (
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
