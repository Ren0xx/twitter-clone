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
      },
})
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#1d9bf0'
        },
        secondary: {main: '#1d9bf1'},
        
      },
})
