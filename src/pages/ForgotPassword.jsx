import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/context/UserContext';
import { TextField, Button, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseAuth';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

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