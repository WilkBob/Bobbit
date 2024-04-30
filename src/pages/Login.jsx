import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/context/UserContext';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { signIn } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';




const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const [form, setForm] = useState({
        email: '',
        password: ''
    
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await signIn(form.email, form.password);
        setUser(user);
        }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '1rem',
            width: '95%',
            maxWidth: '400px',
            margin: 'auto',
            padding: '1rem'
        
        }}>
            <Typography  variant="h4" component="h1" gutterBottom>Sign In</Typography>
            <Typography variant="body1" gutterBottom>Sign in to your Bobbit account to connect with your favorite communities</Typography>

            <form style={{display: 'flex', flexDirection: 'column', gap: '10px'}} onSubmit={handleSubmit}>
                <TextField name='email'fullWidth  label="Email" variant="outlined" onChange={handleChange} />
                <TextField fullWidth name='password' label="Password" variant="outlined" type="password" onChange={handleChange}/>
                <Button fullWidth variant="contained" color="primary" type='submit'>
                    Login
                </Button>
            </form>
            <Link to="/signup" >
                <Typography variant="body2" color="primary">Don't have an account? Register here</Typography>
            </Link>

            <Link to="/forgot-password" >
                <Typography variant="body2" color="primary">Forgot your password?</Typography>
            </Link>
            
        </div>
    );
};

export default Login;
