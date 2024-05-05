import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/context/UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setMessage('Check your email for a password reset link');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
            className='fadeIn'
        >
            <Typography variant="h4">Forgot Password</Typography>
            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                variant="outlined"
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {message && <Typography color="success.main">{message}</Typography>}
        </Box>
    );
}

export default ForgotPassword;