import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { UserContext } from '../components/context/UserContext';
import { signUp } from '../Firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext)
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }}, [user]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{7,})/;
    return re.test(password);
  }

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(username);
  }


  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  }

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username, email, password, confirmPassword} = form;
    if (!validateUsername(username)) {
      setErrors({...errors, username: 'Username must be alphanumeric'});
    } else {
      setErrors({...errors, username: ''});
    }
    if (!validateEmail(email)) {
      setErrors({...errors, email: 'Invalid email address'});
    } else {
      setErrors({...errors, email: ''});
    }
    if (!validatePassword(password)) {
      setErrors({...errors, password: 'Password must contain 1 uppercase letter, 1 special character, and be at least 7 characters long'});
    } else {
      setErrors({...errors, password: ''});
    }
    if (password !== confirmPassword) {
      setErrors({...errors, confirmPassword: 'Passwords do not match'});
    } else {
      setErrors({...errors, confirmPassword: ''});
    }
    if (validateUsername(username) && validateEmail(email) && validatePassword(password) && password === confirmPassword) {
      console.log('User created');
    }

    await signUp(email, password, username);
    console.log(user);
    
  }

  return (
    <>
      <Typography align='center' variant="h3" component="h1" gutterBottom className='fadeIn'>Welcome to Bobbit</Typography>
      <Typography align='center' variant="body1" gutterBottom className='fadeIn'>Please enter your information so we can customize your user experience</Typography>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '95%',
        maxWidth: '400px',
        margin: 'auto',
        flexWrap: 'wrap',
        padding: '1rem'
        }}
        onSubmit={handleSubmit}
        >
        <Typography align='center' variant="body1" component="p" gutterBottom className='fadeIn'>{`Step ${step} of 4`}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  {step > 1 ? 
    <IconButton onClick={prevStep}>
      <ArrowBackIosIcon />
    </IconButton>
    :
    <IconButton style={{ visibility: 'hidden' }}>
      <ArrowForwardIosIcon />
    </IconButton>
  }
  {/* dots to track progress */}
  <Box sx={{ 
  width: '70%', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center' 
}}>
  <Box sx={{ 
    width: step == 1 ? 15 : 8, 
    height: step == 1 ? 15 : 8, 
    bgcolor: validateUsername(form.username) ? '#cf7753' : 'white', 
    borderRadius: '50%', 
    transition: 'background-color 0.3s, width 0.3s, height 0.3s' 
  }} />
  <Box sx={{ 
    width: step == 2 ? 15 : 10, 
    height: step == 2 ? 15 : 10, 
    bgcolor: validateEmail(form.email) ? '#cf7753' : 'white', 
    borderRadius: '50%', 
    transition: 'background-color 0.3s, width 0.3s, height 0.3s' 
  }} />
  <Box sx={{ 
    width: step == 3 ? 15 : 10, 
    height: step == 3 ? 15 : 10, 
    bgcolor: validatePassword(form.password) ? '#cf7753' : 'white', 
    borderRadius: '50%', 
    transition: 'background-color 0.3s, width 0.3s, height 0.3s' 
  }} />
  <Box sx={{ 
    width: step == 4 ? 15 : 8, 
    height: step == 4 ? 15 : 8, 
    bgcolor: step >= 4 ? '#cf7753' : 'white', 
    borderRadius: '50%', 
    transition: 'background-color 0.3s, width 0.3s, height 0.3s' 
  }} />
</Box>
  {step < 4 ? 
    <IconButton onClick={nextStep}>
      <ArrowForwardIosIcon />
    </IconButton>
    :
    <IconButton style={{ visibility: 'hidden' }}>
      <ArrowForwardIosIcon />
    </IconButton>
  }
</div>
      {step === 1 && 
  <TextField 
    error={errors.username.length > 0}
    onChange={handleChange}
    className='fadeIn'
    variant="outlined" 
    margin="normal" 
    required 
    fullWidth 
    id="username" 
    label={"Username" + (errors.username.length > 0 ? ` - ${errors.username}` : '')}
    name="username" 
    autoComplete="username" 
    autoFocus />
}
      {step === 2 && 
        <TextField 
        error={errors.email.length > 0}
        onChange={handleChange}
          className='fadeIn'
          variant="outlined" 
          margin="normal" 
          required 
          fullWidth 
          id="email" 
          label={"Email" + (errors.email.length > 0 ? ` - ${errors.email}` : '')}
          name="email" 
          autoComplete="email" 
        />}
      {step === 3 && 
      <TextField 
      error={errors.password.length > 0}
      onChange={handleChange}
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth 
        name="password" 
        label={"Password" + (errors.password.length > 0 ? ` - ${errors.password}` : '')} 
        type="password" 
        id="password"
        autoComplete="current-password"
        className='fadeIn'
         />}

      {step === 4 &&
      <TextField
      error={errors.confirmPassword.length > 0}
      onChange={handleChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="current-password"
        className='fadeIn'
      />}

      {step === 4 && 
      <Button 
      className='fadeIn'
        type="submit" 
        fullWidth 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '20px' }}>Sign Up
      </Button>}
      </form>
    </>
  )
}

export default Signup