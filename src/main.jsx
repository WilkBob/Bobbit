import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './MUI/Theme.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Router>
      <UserProvider>
    <ThemeProvider theme={theme}>
       <App /> 
    </ThemeProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
)
