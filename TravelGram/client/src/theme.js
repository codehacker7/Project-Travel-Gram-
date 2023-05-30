import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#85C4FF',
            dark: '#0056B8',
            desat: '#A2C3E2'
        },
        secondary: {
            main: '#B8FF99',
            dark: '#0CCE6B',
            desat: '#C1E7B1'
        },
        background: '#00173D',
        white: '#FFFFFF',
        black: '#000000'
    },
    defaults: {
        margin: '0',
        padding: '2%',
        boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        letterSpacing: '0.07em'
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'bebaspro',
            'sans-serif'
        ].join(','),
        fontSize: 16,
        fontWeightRegular: 400,
        fontWeightLight: 200,
        fontWeightBold: 600,
    }
});

export default theme;