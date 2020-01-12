import { createMuiTheme } from '@material-ui/core/styles';

const weNoteTheme = createMuiTheme({
    typography: {
        fontFamily: [
            '"Montserrat"',
            '"Helvetica Neue"',
            'sans-serif'
        ].join(',')
    },
    palette: {
        primary: {
            main: "#FFCE70"
        },
        secondary: {
            main: '#494F55',
        },
    },
});

export default weNoteTheme;