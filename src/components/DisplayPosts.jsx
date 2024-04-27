import { PostItem } from './PostItem';
import { CircularProgress, Divider, List, Typography } from '@mui/material';

const DisplayPosts = ({posts}) => {
  

    return (
        <>
          <List  className='glass' sx={{
            padding: '0',
            borderRadius: '10px',
          }}>
            {posts && Object.values(posts).map(post => (
              [<PostItem post={post} key={post.id}  />, <Divider key={post.id + 'divider'} />]
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
