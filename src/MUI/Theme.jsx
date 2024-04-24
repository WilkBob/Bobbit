import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D9EDBF',
        },
        secondary: {
            main: '#FF9800',
        },
        success: {
            main: '#2C7865',
        },
        info: {
            main: '#90D26D',
        },
        text: {
            primary: '#FFFFFF', 
        },
    },
});

export default theme;