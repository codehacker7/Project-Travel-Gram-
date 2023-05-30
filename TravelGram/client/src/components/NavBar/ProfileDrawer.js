import React, { useState } from 'react';
import { Box, Button, Divider, makeStyles, Drawer, Typography } from '@material-ui/core';
import ProfilePic from '../Profile/ProfilePic';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import theme from '../../theme';

const useStyles = makeStyles({
    drawer: {
        width: 250,
        top: '64px',
        height: '60%',
        backgroundColor: theme.palette.background,
        borderRadius: '20px 0px 0px 20px',
    },
    drawerTop: {
        display: 'flex',
        height: '20%',
        align: 'flex-end',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    accountContainer: {
        position: 'inherit',
        display: 'flex',
        maxWidth: '30px',
        justify: 'flex-end',
    },
});

function ProfileDrawer(props) {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [ visibility, setVisibility ] = useState(false);

    const user = useSelector((state) => state.get('auth').user);
    let id = user.id;

    const toggleDrawer = () => {
        setVisibility(true);
    };

    const closeDrawer = () => {
        setVisibility(false);
    }

    const logOut = () => {
        dispatch(logout());
        window.location = '/';
    }

    return (
        <div>
            <Box className={classes.accountContainer} onClick={toggleDrawer}>
                <ProfilePic size="small" userID={props.user.id} />
            </Box>
            <Drawer classes={{ paper: classes.drawer }} variant="temporary" anchor="right" open={visibility} onClose={closeDrawer}>
                <Box className={classes.drawerTop} bgcolor="primary.main">
                    <Typography style={{ marginLeft: 10, marginBottom: 10, marginTop: 'auto', fontSize: 30, color: theme.palette.background }}>{props.user.username}</Typography>
                </Box>
                <Button component={Link} to="/profile" style={{ justifyContent: "flex-start" }} onClick={closeDrawer}>Profile</Button>
                <Divider />
                <Button style={{ justifyContent: "flex-start" }} onClick={closeDrawer}>Account Settings</Button>
                <Divider />
                <Button style={{ justifyContent: "flex-start" }} onClick={closeDrawer}>Site Settings</Button>
                <Divider />
                <Button style={{ justifyContent: "flex-start", color: "red" }} onClick={logOut}>Log Out</Button>
                <Divider />
            </Drawer>
        </div>

    );
}

export default ProfileDrawer;