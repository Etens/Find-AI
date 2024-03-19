"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as fasStar,
  faSmile,
  faFaceGrinTears,
  faFaceSadTear,
  faFaceFlushed,
  faPeoplePulling,
  faFaceGrinHearts,
  faBrain,
  faHeartPulse,
  faGrinStars,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { HoverBox, HoverBoxContent, HoverBoxTrigger } from "../ui/hover-box";

const getEmotionIcon = (emotion) => {
  const emotionIcons = {
    Rire: faFaceGrinTears,
    Tristesse: faFaceSadTear,
    Peur: faFaceFlushed,
    Motivation: faPeoplePulling,
    Amour: faFaceGrinHearts,
    Réflexion: faBrain,
    Adrénaline: faHeartPulse,
    Émerveillement: faGrinStars,
    Frisson: faFire
  };
  return emotionIcons[emotion] || faSmile;
};

const getRatingStars = (note, explication, dominantColor, isColorLoaded) => {
  let stars = [];
  let rating;

  switch (note) {
    case 'Excellent': rating = 5; break;
    case 'Bon': rating = 4; break;
    case 'Moyen': rating = 3; break;
    case 'Mauvais': rating = 2; break;
    case 'Désastreux': rating = 1; break;
    default: rating = 0;
  }

  for (let i = 0; i < 5; i++) {
    stars.push(
      <HoverBox key={`hover-${i}`} delay={100} openOnHover>
        <HoverBoxTrigger>
          {i < rating ?
            <FontAwesomeIcon icon={fasStar} size="xs" /> :
            <FontAwesomeIcon icon={farStar} size="xs" />}
        </HoverBoxTrigger>
        <HoverBoxContent side="left" align="left">
          <div
            className="text-xs text-gray-200 rounded-lg p-2 bg-black bg-opacity-90 p-4 z-30"
            style={
              isColorLoaded ?
                { boxShadow: `0 0px 30px -15px ${dominantColor}`, color: 'white' } :
                { boxShadow: 'none', color: 'white' }
            }
          >
            {explication}
          </div>
        </HoverBoxContent>
      </HoverBox>
    );
  }

  return stars;
};

const MovieCard = ({ id, title, date, duration, emotion, description, posterURL, mainActors, explication, note, backdropURL }) => {
  const [dominantColor, setDominantColor] = useState('#ffffff');
  const [isColorLoaded, setIsColorLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (backdropURL) {
      axios.get(`/api/color?imageUrl=${encodeURIComponent(backdropURL)}`)
        .then((response) => {
          setDominantColor(response.data.dominantColor || '#ffffff');
          setIsColorLoaded(true);
        })
        .catch((error) => {
          console.error("Erreur lors de l'extraction de la couleur:", error);
          setIsColorLoaded(true);
        });
    }
  }, [backdropURL]);

  const boxShadowColor = isHovered && isColorLoaded ? dominantColor : '#ffffff';
  const boxShadowStyle = { boxShadow: `0 0px 30px -15px ${boxShadowColor}` };

  return (
    <div
      className={`relative overflow-hidden rounded-lg w-full shadow-lg bg-black ${id}`}
      style={boxShadowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 p-4 flex">
        <div className="flex flex-col items-center justify-center">
          <img className="w-24 h-36 rounded shadow-lg" src={posterURL} alt={title} />
          <HoverBox className="mt-2">
            <HoverBoxTrigger>
              <FontAwesomeIcon icon={getEmotionIcon(emotion)} size="xs" className='mt-2' />
            </HoverBoxTrigger>
            <HoverBoxContent side="left" align="left">
              <div
                className="text-xs text-gray-200 rounded-lg p-2 bg-black bg-opacity-90 p-4"
                style={
                  isColorLoaded ?
                    { boxShadow: `0 0px 20px -10px ${dominantColor}`, color: 'white' } :
                    { boxShadow: 'none', color: 'white' }
                }
              >
                {emotion}
              </div>
            </HoverBoxContent>
          </HoverBox>
          <div className="text-gray-300 text-xs flex space-x-1">
            {getRatingStars(note, explication, dominantColor, isColorLoaded)}
          </div>
        </div>
        <div className="ml-4 text-white">
          <h1 className="text-2xl text-gray-200 font-bold">{title}</h1>
          <h4 className="text-base text-gray-300 mt-2">{date} - {duration}</h4>
          <p className="mt-4 text-xs text-gray-400">{mainActors}</p>
          <p className="mt-4 text-gray-200 text-xs leading-relaxed max-w-lg">{description}</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-7/12 h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backdropURL})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent mix-blend-multiply backdrop-filter backdrop-blur-sm"></div>
      </div>
    </div>
  );
}
export default MovieCard;
