"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar, faSmile, faFaceGrinTears, faFaceSadTear, faFaceFlushed, faPeoplePulling, faFaceGrinHearts, faBrain, faHeartPulse, faGrinStars, faFire } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
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
    Frisson: faFire,
  };
  return emotionIcons[emotion] || faSmile;
};

const RatingStars = (note, explication, dominantColor, isColorLoaded) => {
  const [hovered, setHovered] = useState(false);
  let stars = [];
  let rating;

  switch (note) {
    case "Excellent":
      rating = 5;
      break;
    case "Bon":
      rating = 4;
      break;
    case "Moyen":
      rating = 3;
      break;
    case "Mauvais":
      rating = 2;
      break;
    case "Désastreux":
      rating = 1;
      break;
    default:
      rating = 0;
  }

  const starStyles = hovered ? { color: "white" } : {};

  for (let i = 0; i < 5; i++) {
    stars.push(
      <HoverBox key={`hover-${i}`} delay={100} openOnHover>
        <HoverBoxTrigger onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer", ...starStyles }}>
          <FontAwesomeIcon icon={i < rating ? fasStar : farStar} size="xs" />
        </HoverBoxTrigger>
        <HoverBoxContent side="left" align="left">
          <div className="text-xs text-gray-200 rounded-lg bg-black bg-opacity-90 p-4" style={isColorLoaded ? { filter: `drop-shadow(0 0 30px ${dominantColor})` } : {}}>
            {explication}
          </div>
        </HoverBoxContent>
      </HoverBox>
    );
  }
  return stars;
};

const MovieCard = ({ id, title, date, duration, emotion, description, posterURL, explication, note, backdropURL, movieTrailers, actorImages, origin, movieStreamingsForCountry }) => {
  const [dominantColor, setDominantColor] = useState("#ffffff");
  const [isColorLoaded, setIsColorLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [trailerPlayed, setTrailerPlayed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hoverShadow, setHoverShadow] = useState("0 0 30px -15px white");
  const [mainDivClassNames, setMainDivClassNames] = useState(`relative rounded-lg w-full shadow-lg bg-black ${id}`);
  const [zIndex, setZIndex] = useState(1);

  const iframeRef = useRef(null);

  useEffect(() => {
    if (backdropURL) {
      axios
        .get(`/api/color?imageUrl=${encodeURIComponent(backdropURL)}`)
        .then((response) => {
          setDominantColor(response.data.dominantColor || "#ffffff");
          setIsColorLoaded(true);
        })
        .catch((error) => {
          console.error("Erreur lors de l'extraction de la couleur:", error);
          setIsColorLoaded(true);
        });
    }
  }, [backdropURL]);

  const handleMouseEnter = () => {
    setZIndex(10);
    if (!trailerPlayed) {
      setHoverShadow(`0 0 60px -15px ${dominantColor}`);
    }
  };

  const handleMouseLeave = () => {
    setZIndex(1);
    if (!trailerPlayed) {
      setHoverShadow("0 0 30px -15px white");
    }
  };

  const cardStyle = {
    transition: "box-shadow 0.5s ease",
    boxShadow: hoverShadow,
    zIndex: zIndex,
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setMainDivClassNames(`relative overflow-hidden rounded-lg w-full shadow-lg bg-black h-[17rem] lg:h-[24rem] ${id}`);
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

  const shadeColor = (color, percent) => {
    var num = parseInt(color.slice(1), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;

    return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
  };

  const platformIcons = {
    Netflix: "/icons/netflix.svg",
    "Disney Plus": "/icons/disney-plus.svg",
    "Amazon Video": "/icons/amazon-prime-video.svg",
    "Apple TV": "/icons/apple-tv.svg",
  };

  const getCustomTypeMessage = (types) => {
    const typeMessages = types.map((type) => {
      switch (type) {
        case "rent":
          return "Location";
        case "buy":
          return "Achat";
        case "flatrate":
          return "Abonnement";
        default:
          return "";
      }
    });
    return typeMessages.join(", ");
  };

  const popularPlatforms = Object.keys(platformIcons);

  const getPlatformIcon = (providerName, logoPath) => {
    return popularPlatforms.includes(providerName) ? platformIcons[providerName] : `https://image.tmdb.org/t/p/original${logoPath}`;
  };

  const allPlatforms = [].concat(
    (movieStreamingsForCountry?.flatrate || []).map((service) => ({ ...service, isPopular: popularPlatforms.includes(service.provider_name), type: "flatrate" })),
    (movieStreamingsForCountry?.rent || []).map((service) => ({ ...service, isPopular: popularPlatforms.includes(service.provider_name), type: "rent" })),
    (movieStreamingsForCountry?.buy || []).map((service) => ({ ...service, isPopular: popularPlatforms.includes(service.provider_name), type: "buy" }))
  );

  const platformsMap = allPlatforms.reduce((acc, service) => {
    const { type, ...serviceWithoutType } = service;
    if (!acc[service.provider_id]) {
      acc[service.provider_id] = { ...serviceWithoutType, types: [type] };
    } else {
      acc[service.provider_id].types = [...new Set([...acc[service.provider_id].types, type])];
    }
    return acc;
  }, {});

  const uniquePlatforms = Object.values(platformsMap);

  return (
    <div className={`${mainDivClassNames} transition-height duration-500 ease-in-out`}
      style={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className={`flip-card-inner relative h-full 
        ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="perspective m-auto">
          <div className="flex relative p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center mb-6">
              <img className="w-24 h-36 rounded shadow-lg sm:w-20 sm:h-32" src={posterURL} alt={title} />
              <HoverBox delay={100} openOnHover className="mt-2">
                <HoverBoxTrigger className="text-sm text-gray-300 hover:text-white cursor-pointer">
                  <FontAwesomeIcon icon={getEmotionIcon(emotion)} size="xs" className="mt-2 w-4 h-4" />
                </HoverBoxTrigger>
                <HoverBoxContent side="left" align="left" className="w-32">
                  <div className="text-xs text-gray-200 rounded-lg bg-black bg-opacity-90 p-4" style={isColorLoaded ? { filter: `drop-shadow(0 0 10px ${dominantColor})` } : {}}>
                    {emotion}
                  </div>
                </HoverBoxContent>
              </HoverBox>
              <div className="text-gray-300 text-xs flex space-x-1 mt-2 sm:mt-1">
                {RatingStars(note, explication, dominantColor, isColorLoaded)}
              </div>
            </div>
            <div className="ml-4 text-gray-300 z-10">
              <h1 className="text-xl text-white font-bold">{title}</h1>
              <h4 className="text-sm sm:text-xs mt-2">
                {date} - {duration} - {origin}
              </h4>
              <p className="text-xs md:text-sm leading-relaxed mt-4 max-w-lg md:max-w-sm">{description}</p>
              <div className="mt-4">
                {actorImages.map((actor, index) => (
                  <HoverBox key={index} delay={100}>
                    <HoverBoxTrigger className="text-xs text-gray-300 hover:text-white cursor-pointer mr-1"> {actor.name} </HoverBoxTrigger>
                    <HoverBoxContent side="bottom" align="start" sideOffset={-4}>
                      <img className="rounded object-cover shadow-lg h-auto w-14" src={actor.imageUrl} alt={actor.name} style={isColorLoaded ? { filter: `drop-shadow(0 0 10px ${dominantColor})` } : {}} />
                    </HoverBoxContent>
                  </HoverBox>
                ))}
              </div>
              <div className="mt-4 flex space-x-1 gap-4">
                {uniquePlatforms
                  .filter((platform) => platform.isPopular)
                  .map((platform, index) => (
                    <HoverBox key={index} delay={100}>
                      <HoverBoxTrigger className="text-xs text-gray-300 hover:text-white cursor-pointer">
                        <img className="w-6 h-6 lg:w-8 md:h-8"
                          src={getPlatformIcon(platform.provider_name)}
                          alt={platform.provider_name}
                        />
                      </HoverBoxTrigger>
                      <HoverBoxContent side="bottom" align="start" sideOffset={-4}>
                        <div className="p-4 bg-black bg-opacity-90 rounded-lg" style={isColorLoaded ? { filter: `drop-shadow(0 0 10px ${dominantColor})` } : {}}>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col justify-start">
                              <span className="text-xs text-white">{platform.provider_name}</span>
                              <div className="text-xs text-gray-300 mr-2 mt-1">{getCustomTypeMessage(platform.types)}</div>
                            </div>
                          </div>
                        </div>
                      </HoverBoxContent>
                    </HoverBox>
                  ))}
                <div className="text-xs text-gray-300 hover:text-white cursor-pointer flex items-center">
                  {uniquePlatforms.some((platform) => !platform.isPopular) && (
                    <HoverBox delay={100}>
                      <HoverBoxTrigger className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faEllipsisH} className="w-6 h-6" />
                      </HoverBoxTrigger>
                      <HoverBoxContent side="right" align="start" sideOffset={5}>
                        <div className="text-xs text-gray-200 rounded-lg bg-black bg-opacity-90 p-4" style={isColorLoaded ? { filter: `drop-shadow(0 0 10px ${dominantColor})` } : {}}>
                          {uniquePlatforms
                            .filter((platform) => !platform.isPopular)
                            .map((platform, index) => (
                              <div key={index} className="flex items-center space-x-2 p-1">
                                <img className="flex w-8 h-8 items-start rounded-lg" src={getPlatformIcon(platform.provider_name, platform.logo_path)} alt={platform.provider_name} />
                                <div className="flex flex-col mb-1">
                                  <span className="text-sm text-white">{platform.provider_name}</span>
                                  <span className="text-xs text-gray-300">{getCustomTypeMessage(platform.types)}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </HoverBoxContent>
                    </HoverBox>
                  )}
                </div>
              </div>
            </div>
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-cover w-2/4 z-0 rounded-r-lg`} style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0 rounded-r-lg w-full h-full backdrop-filter backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
        <div className={`flip-card-back absolute inset-0 bg-black z-10`}>
          {isFlipped && (
            <>
              <div className="absolute inset-0 flex items-center justify-center z-5">
                {iframeLoaded ? null : (
                  <div className="flex justify-center items-center h-screen">
                    <div
                      className="relative w-14 h-14 animate-spin rounded-full"
                      style={{
                        filter: `drop-shadow(0 0 10px ${dominantColor})`,
                        background: `linear-gradient(to right, 
                          ${shadeColor(dominantColor, -10)}, 
                          ${dominantColor}, 
                          ${shadeColor(dominantColor, 10)})`,
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 z-20 flex items-center justify-center h-full"
                onClick={handleFlip}>
              </div>
              <iframe ref={iframeRef} className={`custom-ratio ${iframeLoaded ? "block" : "hidden"} z-10`} src={`${movieTrailers}?rel=0&showinfo=0&modestbranding=1`} allow="autoplay; encrypted-media" allowFullScreen title="Movie Trailer" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" onLoad={handleIframeLoad}></iframe>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
