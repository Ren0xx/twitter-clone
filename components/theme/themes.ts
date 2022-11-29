import { createTheme } from '@mui/material/styles';
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#1d9bf0',
        },
        secondary: {
          main: '#ede7f6',
        },
        background: {
          default: '#000000',
          paper: '#16181c',
        },
        info: {
          main: '#000000',
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
        secondary: {main: '#1d9bf1'},
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
