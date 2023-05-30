import React, {useState} from 'react';
import {Button, IconButton, makeStyles, Drawer, Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../../theme';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
   drawer: {
       width: 250,
       top: '20px',
       height: '90%',
       backgroundColor: theme.palette.background,
       borderRadius: '0px 20px 20px 0px',
   },
    topSpace: {
      height: '50px',
    },
   link: {
       color: '#75BEE7',
       textDecoration: 'none',
   },
}));

function MenuDrawer(props) {

    const classes = useStyles(theme);
    const [visibility, setVisibility] = useState(false);

    const toggleDrawer = () => {
        setVisibility(true);
    };

    const closeDrawer = () => {
        setVisibility(false);
    }



    return (
        <div>
            <IconButton ml={10} mr={20} onClick={toggleDrawer} color="primary">
                <MenuIcon/>
            </IconButton>
            <Drawer classes={{paper: classes.drawer}} variant="temporary" open={visibility} onClose={closeDrawer}>
                <div className={classes.topSpace}></div>
                <Divider />
                <Button component={Link} to="/dashboard" style={{justifyContent: "flex-start"}} onClick={closeDrawer}>Dashboard</Button>
                <Divider />
                <Button style={{justifyContent: "flex-start"}} onClick={closeDrawer}>My Trips</Button>
                <Divider />
                <Button style={{justifyContent: "flex-start"}} onClick={closeDrawer}>View Other Trips</Button>
                <Divider />
            </Drawer>
        </div>

    );
}

export default MenuDrawer;