// refactorer le code movie-card en ajoutant toute la logique concernant les émotions ici 
"use client";

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar, faSmile, faFaceGrinTears, faFaceSadTear, faFaceFlushed, faPeoplePulling, faFaceGrinHearts, faBrain, faHeartPulse, faGrinStars, faFire } from "@fortawesome/free-solid-svg-icons";

export default function MovieCardEmotions(emotion) {
    const icon = {
        Rire: faFaceGrinTears,
        Tristesse: faFaceSadTear,
        Peur: faFaceFlushed,
        Motivation: faPeoplePulling,
        Amour: faFaceGrinHearts,
        Réflexion: faBrain,
        Adrénaline: faHeartPulse,
        Émerveillement: faGrinStars,
        Frisson: faFire,
    };
    return emotionIcons[emotion] || faSmile;
}




