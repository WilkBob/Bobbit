import React, { useEffect, useState } from 'react';
import { getForums } from '../Firebase/Forums';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

const DisplayForums = () => {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchForums = async () => {
        const forums = await getForums();
        //console.log(forums);
        setForums(forums);
    };

    useEffect(() => {
        fetchForums();
        setLoading(false);
    }, []);

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Forums
            </Typography>
            <Grid container spacing={3}>
                {loading && (
                    <Grid item md={12}>
                        <CircularProgress />
                    </Grid>
                )}

                {!loading &&
                    forums.map(forum => (
                        <Grid item xs={12} sm={6} md={4} key={forum.id} sx={{ display: 'flex' }}>
                            <Card raised component={RouterLink} to={`/forum/${forum.id}`} sx={{ textDecoration: 'none', display: 'flex' }}>
                                <CardActionArea>
                                    {forum.image && <CardMedia component="img" height="140" image={forum.image} alt={forum.name} />}
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%'
                                        }}
                                    >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {forum.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {forum.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {forum.posts ? Object.keys(forum.posts).length : 0} posts
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Divider />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default DisplayForums;