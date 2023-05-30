import { Box, makeStyles } from '@material-ui/core';
import TravelGram from '../images/TravelGram.png';

const useStyles = makeStyles({
    root: {
        flexGrow: 0,
        width: '100%',
        display: 'flex',
        height: '120px',
        cursor: 'pointer',
        backgroundColor: '#3DB8DA',
        alignItems: 'flex-end',
    },
    text: {
        position: 'absolute',
        marginLeft: '50px',
        fontSize: '70px',
        color: 'white',
    },
    logo: {
        position: 'relative',
        marginLeft: '30px',
        marginBottom: '25px',
        marginTop: 'auto',
        maxHeight: '70px',
    }
});

export default function TitleBar(props) {

    const classes = useStyles();

    return (
        <Box className={classes.root} bgcolor="secondary.main">
            <img className={classes.logo} src={TravelGram} />
        </Box>

    );


}