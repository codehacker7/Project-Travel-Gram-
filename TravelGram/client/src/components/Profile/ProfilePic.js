import React, { useEffect, useState } from 'react';
import { Box, Avatar, makeStyles } from '@material-ui/core';
import ProfileCard from './ProfileCard'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    large: {
        height: '150px',
        width: '150px',
        background: 'white',
    },
    medium: {
        height: '100px',
        width: '100px',
        background: 'white',
    },
    small: {
        height: '30px',
        width: '30px',
        background: 'white',
    },
    container: {
        position: 'inherit',
    },
}));

// Props:
// size ["small", "medium", "large"]
// clickable [true, or false] (to enable profile snippet toggling)
// userID ["string"] (to get pic and info)
// tempImage ["url"] (for image upload preview)
export default function ProfilePic(props) {
    const classes = useStyles();

    const [ loading, setLoading ] = useState(true);
    const [ cardVisibility, setCardVisibility ] = useState(false);
    const [ userInfo, setUserInfo ] = useState({});

    const id = props.userID;


    useEffect(() => {
        if (props.tempImage) {
            setLoading(false);
        } else {
            axios.get(`/user/profile/${id}`)
                .then(res => {
                    setUserInfo(res.data);
                    setLoading(false);
                })
        }
    }, []);

    const toggleCard = (event) => {
        if (!cardVisibility) {
            setCardVisibility(true);
        } else {
            setCardVisibility(false);
        }
    }

    let pic;
    if (props.tempImage) {
        pic = <Avatar src={props.tempImage} className={classes[ props.size ]} />
    } else {
        if (props.clickable) {
            pic = <Avatar src={userInfo.photo_id} className={classes[ props.size ]} style={{ cursor: 'pointer' }}
                onClick={toggleCard} />
        } else {
            pic = <Avatar src={userInfo.photo_id} className={classes[ props.size ]} />
        }
    }

    let defaultPic = <Avatar className={classes[ props.size ]} />;

    if (loading) {
        return (
            <Box className={classes.container}>
                {defaultPic}
                {cardVisibility && <ProfileCard onChange={setCardVisibility} info={userInfo} userID={id} />}
            </Box>
        );
    } else {
        return (
            <Box className={classes.container}>
                {pic}
                {cardVisibility && <ProfileCard onChange={setCardVisibility} info={userInfo} userID={id} />}
            </Box>
        );
    }
}