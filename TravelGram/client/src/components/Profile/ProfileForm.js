import React, { useState } from 'react';
import { Button, makeStyles, TextField, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/slices/authSlice';
import { storeImages } from '../../services/storage';
import theme from '../../theme';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
    formRoot: {
        width: '100%',
        marginTop: "5%",
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    field: {
        flexGrow: 1,
        margin: '1.5%'
    },
    saveButton: {
        padding: '1% 0%',
        margin: '2%',
        width: '100%',
        fontSize: '1em',
        color: theme.palette.black,
        background: 'linear-gradient(160deg, ' + theme.palette.primary.main + ', ' + theme.palette.secondary.main + ')',
        '&:hover': {
            color: theme.palette.white,
            background: 'linear-gradient(160deg, ' + theme.palette.primary.dark + ', ' + theme.palette.secondary.dark + ')'
        }
    },
    disabledButton: {
        color: 'grey !important',
        background: 'linear-gradient(160deg, ' + theme.palette.primary.desat + ', ' + theme.palette.secondary.desat + ')'
    },
    alert: {
        margin: '2%'
    }
});

export default function ProfileForm(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.get('auth').user);

    const [ userFirstName, setUserFirstName ] = useState(props.userInfo.first_name);
    const [ userLastName, setUserLastName ] = useState(props.userInfo.last_name);
    const [ userEmail, setUserEmail ] = useState(props.userInfo.email);
    const [ userAbout, setUserAbout ] = useState(props.userInfo.about);
    const [ userPhone, setUserPhone ] = useState(props.userInfo.phone);
    const [ userAddress, setUserAddress ] = useState(props.userInfo.street);
    const [ userCity, setUserCity ] = useState(props.userInfo.city);
    const [ userState, setUserState ] = useState(props.userInfo.state);
    const [ userZip, setUserZip ] = useState(props.userInfo.zip);
    const [ userCountry, setUserCountry ] = useState(props.userInfo.country);
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [ showError, setShowError ] = useState(false);
    const [ formMessage, setFormMessage ] = useState('');

    const handleFirstNameChange = (event) => {
        props.setChanged(true);
        setUserFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        props.setChanged(true);
        setUserLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        props.setChanged(true);
        setUserEmail(event.target.value);
    };

    const handleAboutChange = (event) => {
        props.setChanged(true);
        setUserAbout(event.target.value);
    };

    const handlePhoneChange = (event) => {
        props.setChanged(true);
        setUserPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        props.setChanged(true);
        setUserAddress(event.target.value);
    };

    const handleCityChange = (event) => {
        props.setChanged(true);
        setUserCity(event.target.value);
    };

    const handleStateChange = (event) => {
        props.setChanged(true);
        setUserState(event.target.value);
    };

    const handleZipChange = (event) => {
        props.setChanged(true);
        setUserZip(event.target.value);
    };

    const handleCountryChange = (event) => {
        props.setChanged(true);
        setUserCountry(event.target.value);
    };

    const handleSave = async () => {
        props.setChanged(false);
        let imageURL;
        if (props.imageFiles) {
            let images = await storeImages(props.imageFiles);
            imageURL = images[ 0 ];
        }

        let user = {
            first_name: userFirstName,
            last_name: userLastName,
            email: userEmail,
            about: userAbout,
            phone: userPhone,
            street: userAddress,
            city: userCity,
            state: userState,
            zip: userZip,
            country: userCountry,
            photo_id: imageURL,
            _id: props.userId,
        };
        dispatch(updateUser(user));

        if (userStore.error) {
            setFormMessage("Error updating profile");
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                clearTimeout(timer);
            }, 4000);
        } else {
            setFormMessage(`User profile is successfully updated!`);
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
                clearTimeout(timer);
            }, 4000);
        }
    };

    return (
        <form className={classes.formRoot} noValidate autoComplete="off">
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <FormControl className={classes.field} variant="outlined">
                        <InputLabel htmlFor="profile-first-name">First Name</InputLabel>
                        <OutlinedInput id="profile-first-name" value={userFirstName} onChange={handleFirstNameChange} label="First Name" />
                    </FormControl>
                    <FormControl className={classes.field} variant="outlined">
                        <InputLabel htmlFor="profile-last-name">Last Name</InputLabel>
                        <OutlinedInput id="profile-last-name" value={userLastName} onChange={handleLastNameChange} label="Last Name" />
                    </FormControl>
                </div>

                <div className={classes.subContainer}>
                    <FormControl className={classes.field} variant="outlined" fullWidth>
                        <InputLabel htmlFor="profile-email">Email</InputLabel>
                        <OutlinedInput id="profile-email" value={userEmail} onChange={handleEmailChange} label="Email" />
                    </FormControl>
                </div>

                <div className={classes.subContainer}>
                    <FormControl className={classes.field} variant="outlined" fullWidth>
                        <InputLabel htmlFor="profile-phone-number">Phone Number</InputLabel>
                        <OutlinedInput id="profile-phone-number" value={userPhone} onChange={handlePhoneChange} label="Phone Number" />
                    </FormControl>
                </div>

                <div className={classes.subContainer}>
                    <TextField className={classes.field} variant="outlined"
                        id="user-about" label="About You" fullWidth
                        multiline rows={3} value={userAbout}
                        onChange={handleAboutChange}
                    />
                </div>

                <div className={classes.subContainer}>
                    <FormControl className={classes.field} variant="outlined">
                        <InputLabel htmlFor="profile-street-address">Street Address</InputLabel>
                        <OutlinedInput id="profile-street-address" value={userAddress} onChange={handleAddressChange} label="Street Address" />
                    </FormControl>
                </div>

                <div className={classes.subContainer}>
                    <FormControl className={classes.field} variant="outlined">
                        <InputLabel htmlFor="profile-city">City</InputLabel>
                        <OutlinedInput id="profile-city" value={userCity} onChange={handleCityChange} label="City" />
                    </FormControl>
                    <FormControl className={classes.field} variant="outlined">
                        <InputLabel htmlFor="profile-state">State / Province</InputLabel>
                        <OutlinedInput id="profile-state" value={userState} onChange={handleStateChange} label="State / Province" />
                    </FormControl>
                </div>

                <div className={classes.subContainer}>
                    <FormControl className={classes.field} variant="outlined" style={{ flexGrow: 10 }}>
                        <InputLabel htmlFor="profile-country">Country</InputLabel>
                        <OutlinedInput id="profile-country" value={userCountry} onChange={handleCountryChange} label="Country" />
                    </FormControl>
                    <FormControl className={classes.field} variant="outlined" style={{ flexGrow: 1 }}>
                        <InputLabel htmlFor="profile-zip">Postal Code</InputLabel>
                        <OutlinedInput id="profile-zip" value={userZip} onChange={handleZipChange} label="Postal Code" />
                    </FormControl>
                </div>


                <div className={classes.subContainer}>
                    <Button classes={{ root: classes.saveButton, disabled: classes.disabledButton }} variant="contained"
                        disabled={!props.changed} onClick={handleSave}>
                        SAVE CHANGES
                    </Button>
                </div>

                {showSuccess && <Alert variant="outlined" severity="success" className={classes.alert}>{formMessage}</Alert>}
                {showError && <Alert variant="outlined" severity="error" className={classes.alert}>{formMessage}</Alert>}
            </div>
        </form>
    );
}