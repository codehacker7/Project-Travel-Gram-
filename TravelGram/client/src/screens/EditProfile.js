import React, { useState, useEffect } from 'react';
import { Box, Card, makeStyles, IconButton, Typography } from '@material-ui/core';
import ProfilePic from '../components/Profile/ProfilePic';
import ProfileForm from '../components/Profile/ProfileForm';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import theme from '../theme';

const useStyles = makeStyles({
    profileRoot: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(at top left, ' + theme.palette.primary.dark + ', transparent 60%), ' +
            'radial-gradient(at top right, ' + theme.palette.primary.main + ', transparent 70%), ' +
            'radial-gradient(at bottom left, ' + theme.palette.secondary.main + ', transparent 70%), ' +
            'radial-gradient(at bottom right, ' + theme.palette.secondary.dark + ', transparent 90%)'
    },
    card: {
        margin: '3%',
        minWidth: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.defaults.padding,
        boxShadow: theme.defaults.boxShadow,
        borderRadius: theme.defaults.borderRadius,
        backgroundColor: theme.palette.background
    },
    title: {
        background: 'linear-gradient(160deg, ' + theme.palette.primary.main + ', ' + theme.palette.secondary.main + ')',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        alignSelf: 'center',
        fontWeight: 900,
        fontSize: '2em',
    },
    username: {
        fontSize: '1.5em',
        fontWeight: 500,
    },
    picture: {
        position: 'relative',
        margin: theme.defaults.padding
    },
    editPicture: {
        position: 'absolute',
        bottom: '0',
        right: '0',
        zIndex: '1',
        background: theme.palette.primary.main,
        color: theme.palette.background,
        '&:hover': {
            background: theme.palette.primary.dark,
            color: theme.palette.white
        }
    },
});

export default function EditProfile(props) {
    const classes = useStyles();

    const [ loading, setLoading ] = useState(true);
    const [ selectedFiles, setSelectedFiles ] = useState();
    const [ imageURL, setImageURL ] = useState();
    const [ changed, setChanged ] = useState(false);
    const [ userInfo, setUserInfo ] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        about: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        photo_id: "",
        trips: [],
    });

    const user = useSelector((state) => state.get('auth').user);
    let id = user.id;

    useEffect(() => {
        axios.get(`/user/profile/${user.id}/`)
            .then(res => {
                setUserInfo(res.data);
                setLoading(false);
            }).catch(err => {
                console.log("TEST DEBUG");
                console.log(err);
            });
    }, []);

    const handleFileChange = (event) => {
        var binaryData = [];
        binaryData.push(event.target.files[ 0 ]);
        setImageURL(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })));
        let fileArray = Array.from(event.target.files ?? []);
        setSelectedFiles(fileArray);
        setChanged(true);
    }

    if (loading) {
        return (
            <Box className={classes.profileRoot}>
                <Card className={classes.card}>
                    <Typography className={classes.title}>LOADING...</Typography>
                </Card>
            </Box>
        );
    } else {
        return (
            <Box className={classes.profileRoot}>
                <Card className={classes.card}>
                    <Typography className={classes.title}>EDIT PROFILE</Typography>
                    <Box className={classes.picture}>
                        <ProfilePic size="large" userInfo={userInfo} userID={id} tempImage={imageURL} />
                        <IconButton className={classes.editPicture} component="label">
                            <input type="file" onChange={handleFileChange} hidden />
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <Typography className={classes.username}>{userInfo.username}</Typography>
                    <ProfileForm
                        userInfo={userInfo}
                        onChangeUserInfo={setUserInfo}
                        userId={id} imageFiles={selectedFiles}
                        changed={changed} setChanged={setChanged}
                    />
                </Card>
            </Box>
        );
    }
}