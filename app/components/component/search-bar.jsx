"use client";
import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ setAssistantContent, setMovieDetailsMDb }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [language, setLanguage] = useState('fr-FR');

  useEffect(() => {
    if (!isLoading && messages.length > 0) {

      const filteredAndParsedMessages = messages.filter(message => message.role === 'assistant').map(assistantMessage => {
        try {
          return JSON.parse(assistantMessage.content);
        } catch (error) {
          console.error('Erreur lors du parsing du contenu du message de l\'assistant:', error);
          return null;
        }
      }).filter(content => content !== null);

      setAssistantContent(filteredAndParsedMessages);

      filteredAndParsedMessages.forEach(async (message) => {
        try {
          const response = await axios.get(`/api/movie/search?query=${encodeURIComponent(message["Titre du visionnage"])}&language=${language}`);

          if (response.data.results.length > 0) {
            const movieDetails = response.data.results.find(movie => movie.release_date.startsWith(message["Date de sortie"]));

            if (movieDetails.id) {
              const movieDetailsResponse = await axios.get(`/api/movie/details?id=${movieDetails.id}&language=${language}`);
              const movieImagesResponse = await axios.get(`/api/movie/posters?id=${movieDetails.id}`);
              const movieImages = movieImagesResponse.data;
              const { poster_path, runtime } = movieDetailsResponse.data;
              const posterURL = `https://image.tmdb.org/t/p/original${poster_path}`;
              const duration = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "Durée inconnue";
              const mainActors = movieDetailsResponse.data.credits.cast.slice(0, 5).map(actor => actor.name).join(", ");
              const id = movieDetailsResponse.data.id;

              const newMovieDetails = {
                id,
                posterURL,
                backdropURL: movieImages.backdropUrl,
                releaseDate: message["Date de sortie"],
                title: message["Titre du visionnage"],
                description: message["Description courte sans spoiler"],
                emotion: message["Emotion"],
                note: message["Réputation Web"]?.Note,
                explication: message["Réputation Web"]?.Explication,
                duration,
                mainActors
              };

              setMovieDetailsMDb(prevMovies => [...prevMovies.filter(movie => movie.id !== id), newMovieDetails]);

              console.log("Détails du film récupérés:", newMovieDetails);
            }
          } else {
            console.log("Aucun film trouvé correspondant au critère.");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des détails du film:", error);
        }
      });
    }
  }, [isLoading]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  const clearInput = () => {
    handleInputChange({ target: { value: '' } });
  };

  const loadingAnimation = (
    <div className="flex justify-center items-center space-x-2 text-sm text-gray-500 mt-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black-500"></div>
      <div className="text-white-500">Chargement en cours...</div>
    </div>
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const value = e.target.value;
      const selectionStart = e.target.selectionStart;
      const selectionEnd = e.target.selectionEnd;
      handleInputChange({
        target: {
          value: value.slice(0, selectionStart) + "\n" + value.slice(selectionEnd),
        },
      });
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
    else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col items-center py-9">
      <div className="p-1 w-full max-w-md">
        <div className="p-2 bg-black rounded-lg shadow-lg relative">
          <form onSubmit={handleFormSubmit} className="flex items-center">
            <FontAwesomeIcon icon={faSearch} className="w-4 h-5 absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <textarea
              className="w-full p-3 pl-11 pr-10 text-sm text-gray-300 bg-black focus:outline-none rounded-lg border border-gray-700 resize-none custom-scrollbar"
              placeholder="Rechercher un film..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              rows={1}
              style={{ boxShadow: '0 0px 30px -15px white' }}
            />
            {input && (
              <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={clearInput} />
            )}
          </form>
        </div>
      </div>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            background-color: transparent; /* or any color you want */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #a0a0a0; /* or any color you want */
            border-radius: 4px;
            border: 2px solid black; /* space between scrollbar and border */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #b0b0b0; /* color when hover */
          }
        `}
      </style>
      {isLoading && loadingAnimation}
    </div>
  );
}