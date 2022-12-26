import { createTheme } from '@mui/material/styles';
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#1d9bf0',
          dark: "#121212"
        },
        secondary: {
          main: '#ede7f6',
        },
        background: {
          default: '#000000',
          paper: '#000000',
        },
        info: {
          main: '#3949ab',
        },
        
      },
      typography: {
        button: {
          textTransform: 'none'
        },
        
      },
      
      
})
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#1d9bf0'
        },
        secondary: {main: '#1d1d1d'},
        info: {
          main: '#ffffff',
        },
        
      },
      typography: {
        button: {
          textTransform: 'none',
        },
      },
})
