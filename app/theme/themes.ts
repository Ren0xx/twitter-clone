import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#1d9bf0',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#000000',
          paper: '#16181c',
        },
      },
})
