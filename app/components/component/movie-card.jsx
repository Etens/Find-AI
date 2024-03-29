"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as fasStar, faSmile, faFaceGrinTears, faFaceSadTear, faFaceFlushed, faPeoplePulling, faFaceGrinHearts, faBrain, faHeartPulse, faGrinStars, faFire,
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
  const [hovered, setHovered] = useState(false);
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

  const starStyles = hovered ? { color: 'white' } : {};

  for (let i = 0; i < 5; i++) {
    stars.push(
      <HoverBox key={`hover-${i}`} delay={100} openOnHover>
        <HoverBoxTrigger
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ cursor: 'pointer', ...starStyles }}
        >
          <FontAwesomeIcon icon={i < rating ? fasStar : farStar} size="xs" />
        </HoverBoxTrigger>
        <HoverBoxContent side="left" align="left">
          <div
            className="text-xs text-gray-200 rounded-lg bg-black bg-opacity-90 p-4 z-10"
            style={isColorLoaded ? { boxShadow: `0 0px 30px -15px ${dominantColor}`, color: 'white' } : {}}
          >
            {explication}
          </div>
        </HoverBoxContent>
      </HoverBox>
    );
  }
  return stars;
};

const MovieCard = ({ id, title, date, duration, emotion, description, posterURL, explication, note, backdropURL, movieTrailers, actorImages }) => {
  const [dominantColor, setDominantColor] = useState('#ffffff');
  const [isColorLoaded, setIsColorLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [trailerPlayed, setTrailerPlayed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hoverShadow, setHoverShadow] = useState('0 0 30px -15px white');
  const [mainDivClassNames, setMainDivClassNames] = useState(`relative rounded-lg w-full shadow-lg bg-black ${id}`);

  const iframeRef = useRef(null);

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

  const handleMouseEnter = () => {
    if (!trailerPlayed) {
      setHoverShadow(`0 0 60px -15px ${dominantColor}`);
    }
  };

  const handleMouseLeave = () => {
    if (!trailerPlayed) {
      setHoverShadow('0 0 30px -15px white');
    }
  };

  const cardStyle = {
    transition: 'box-shadow 0.5s ease',
    boxShadow: hoverShadow,
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setMainDivClassNames(`relative overflow-hidden rounded-lg w-full shadow-lg bg-black h-[24rem] ${id}`);
  };

  useEffect(() => {
    if (isFlipped) {
      setIframeLoaded(false);
      const newSrc = `${movieTrailers}?rel=0&showinfo=0&modestbranding=1&autoplay=${isFlipped ? 1 : 0}`;
      iframeRef.current.src = newSrc;
      setTrailerPlayed(isFlipped);
    } else {
      setMainDivClassNames(`relative rounded-lg w-full shadow-lg bg-black ${id}`);
    }
  }, [isFlipped]);

  useEffect(() => {
    if (isFlipped && !trailerPlayed) {
      iframeRef.current.src += "&autoplay=1";
      setTrailerPlayed(true);
    } else if (!isFlipped && trailerPlayed) {
      setTrailerPlayed(false);
    }
  }, [isFlipped, trailerPlayed]);

  const handleIframeLoad = () => {
    setTimeout(() => {
      setIframeLoaded(true);
    }, 2000);
  };

  useEffect(() => {
    if (trailerPlayed) {
      setHoverShadow(`0 0 80px -30px ${dominantColor}`);
    } else {
      setHoverShadow(hoverShadow);
    }
  }, [trailerPlayed, dominantColor, hoverShadow]);


  const backgroundImageUrl = backdropURL || posterURL;

  return (
    <div
      className={`${mainDivClassNames} transition-height duration-500 ease-in-out`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flip-card-inner relative h-full ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div
          className="perspective m-auto"
          style={
            isColorLoaded ?
              { hoverShadow: `0 0px 20px -10px ${dominantColor}`, color: 'white' } :
              { hoverShadow: 'none', color: 'white' }
          }
        >
          <div className="flex relative p-4 p-rigth-0 z-30">
            <div className="flex flex-col items-center justify-center">
              <img className="w-24 h-36 rounded shadow-lg" src={posterURL} alt={title} />
              <HoverBox delay={100} openOnHover className="mt-2">
                <HoverBoxTrigger className="text-sm text-gray-300 hover:text-white cursor-pointer">
                  <FontAwesomeIcon icon={getEmotionIcon(emotion)} size="xs" className='mt-2 w-4 h-4' />
                </HoverBoxTrigger>
                <HoverBoxContent side="left" align="left" className="w-32">
                  <div
                    className="text-xs text-gray-200 rounded-lg bg-black bg-opacity-90 p-4">
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
              <h4 className="text-base text-gray-300 mt-3">{date} - {duration}</h4>
              <p className="mt-3 text-gray-200 text-xs leading-relaxed max-w-lg">{description}</p>
              <div className="mt-4">
                {actorImages.map((actor, index) => (
                  <HoverBox key={index} delay={100} openOnHover>
                    <HoverBoxTrigger className="text-xs text-gray-300 hover:text-white cursor-pointer mr-2">
                      {actor.name}
                    </HoverBoxTrigger>
                    <HoverBoxContent side="bottom" align="start" sideOffset={-4}>
                      <img
                        className="rounded object-cover shadow-lg h-auto w-14"
                        src={actor.imageUrl}
                        alt={actor.name}
                        // add drop-shadow to the image for better visibility with dominant color
                        style={isColorLoaded ? { filter: `drop-shadow(0 0 10px ${dominantColor})` } : {}}
                      />
                    </HoverBoxContent>
                  </HoverBox>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 bottom-0 w-[57%] overflow-hidden bg-cover mr-[-10%]`}
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent mix-blend-multiply backdrop-filter backdrop-blur-sm"></div>
          </div>
        </div>
        <div className={`flip-card-back absolute inset-0 bg-black`}>
          {isFlipped && (
            <>
              <div
                className={`absolute inset-0 flex items-center justify-center ${iframeLoaded ? 'hidden' : 'block'}`}
              >
                <FontAwesomeIcon icon={faFaceGrinTears} size="3x" spin className="text-white" />
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center z-10"
                onClick={handleFlip}
              ></div>
              <iframe
                ref={iframeRef}
                className={`custom-ratio ${iframeLoaded ? 'block' : 'hidden'}`}
                src={`${movieTrailers}?rel=0&showinfo=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Movie Trailer"
                sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
                onLoad={handleIframeLoad}
              ></iframe>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;