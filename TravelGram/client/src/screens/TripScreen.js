import React, { useState } from 'react';

import TripSchedule from '../components/Trip/TripSchedule';
import ActivityPopup from '../components/Trip/ActivityPopup';

import './TripScreen.css';

export default function TripScreen() {

    // Component Hooks
    const [ showPopup, setShowPopup ] = useState(false);
    const [ selectedCard, setSelectedCard ] = useState(null);

    // Component Functions
    const togglePopup = (openedCard) => {
        if (showPopup) {
            setSelectedCard(null);
        } else {
            setSelectedCard(openedCard);
        }
        setShowPopup(!showPopup);
    };

    // Return Component
    return (
        <div className="trip-screen">
            <div className="background"></div>
            <TripSchedule openPopup={togglePopup} />
            {showPopup && <ActivityPopup card={selectedCard} closePopup={togglePopup} />}
        </div>
    );
};