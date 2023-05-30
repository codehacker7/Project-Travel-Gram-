import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, TextField, CardMedia } from '@material-ui/core';
import './ActivityPopup.css';

export default function ActivityPopup(props) {

    const useStyles = makeStyles({
        cardBack: {

        },
        media: {
            height: 120,
            borderRadius: 15
        },
        text: {
            margin: 20
        }
    });
    const styles = useStyles();

    return (
        <Card className="popup">
            <div className="popup-back" onClick={props.closePopup} />
            <div className="popup-front">
                <CardMedia className={styles.media}
                    image="https://www.123dentist.com/wp-content/uploads/2018/04/dental-emergency-travelling-825x550.jpg"
                />
                <TextField className={styles.text}
                    label="Card Name"
                    defaultValue={props.card.name}
                    variant="outlined"
                />
                <TextField className={styles.text}
                    id="outlined-multiline-static"
                    label="Card Description"
                    multiline
                    rows={2}
                    defaultValue={props.card.description}
                    variant="outlined"
                />
            </div>
        </Card>
    );
};