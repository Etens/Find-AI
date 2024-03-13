"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieCard = ({ id, title, date, director, duration, emotion, description, posterURL, mainActors, explication, note }) => {
  const [dominantColor, setDominantColor] = useState('#ffffff');
  const [isColorLoaded, setIsColorLoaded] = useState(false); 

  useEffect(() => {
    if (posterURL) {
      axios.get(`/api/color?imageUrl=${encodeURIComponent(posterURL)}`)
      .then((response) => {
          setDominantColor(response.data.dominantColor || '#ffffff');
          setIsColorLoaded(true); 
        })
        .catch((error) => {
          console.error("Erreur lors de l'extraction de la couleur:", error);
          setIsColorLoaded(true); 
        });
    }
  }, [posterURL]);

  const haloStyle = isColorLoaded ? {
    boxShadow: `0 0px 30px -15px ${dominantColor}`,
  } : {};

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out bg-black ${id}`} style={haloStyle}>
      <div className="relative z-10 p-4 flex">
        <img className="w-24 h-36 rounded shadow-lg" src={posterURL} alt={title} />
        <div className="ml-4 text-white">
          <h1 className="text-2xl text-gray-200 font-bold">{title}</h1>
          <h4 className="text-lg text-gray-300">{date}, {director}</h4>
          <span className="text-sm text-gray-400">{duration}</span>
          <p className="text-sm text-gray-400">{emotion} {note}</p>
          <p className="mt-4 text-xs text-gray-400">{mainActors}</p>
          <p className="mt-4 text-gray-200 text-xs leading-relaxed sm:text-sm">{description}</p>
          <p className="mt-4 text-xs text-gray-400 max-w-3xl">{explication}</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-7/12 h-full bg-cover bg-no-repeat" style={{ backgroundImage: `url(${posterURL})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent mix-blend-multiply backdrop-filter backdrop-blur-sm"></div>
      </div>
    </div>
  );
};

export default MovieCard;
