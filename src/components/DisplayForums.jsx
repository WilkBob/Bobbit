import React, { useEffect, useState } from 'react';
import { getForums } from '../Firebase/Forums';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const DisplayForums = () => {
    const [forums, setForums] = useState([]);
    const fetchForums = async () => {
        const forums = await getForums();
        console.log(forums);
        setForums(forums);
    }

    useEffect(() => {
        fetchForums();
    }, []);

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Forums
            </Typography>
            <List>
                {forums.map(forum => (
                    <ListItem button component={RouterLink} to={`/forum/${forum.id}`} key={forum.id}>
                        <ListItemText primary={forum.name} secondary={forum.description}/>
                        <Typography variant="body2" color="textSecondary">{forum.posts ? (
                            Object.keys(forum.posts).length
                        ) : 0 + ` posts`}</Typography>
                    
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default DisplayForums;