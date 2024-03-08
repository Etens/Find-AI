"use client";
import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import axios from 'axios';

export default function SearchBar({ setAssistantContent, setMovieDetailsMDb }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [requestIndex, setRequestIndex] = useState(0);
  const [language, setLanguage] = useState('fr-FR');

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      console.log("🔄 Nouvelle requête détectée.");
      setRequestIndex(prevIndex => prevIndex + 1);

      const filteredAndParsedMessages = messages.filter(message => message.role === 'assistant').map(assistantMessage => {
        try {
          return JSON.parse(assistantMessage.content);
        } catch (error) {
          console.error('❗ Erreur lors du parsing du contenu du message de l\'assistant:', error);
          return null;
        }
      }).filter(content => content !== null);

      setAssistantContent(filteredAndParsedMessages);
      console.log("📬 Messages transformés en JSON:", filteredAndParsedMessages);

      filteredAndParsedMessages.forEach(async (message) => {
        try {
          console.log("🔍 Recherche des détails du film pour:", message["Titre du visionnage"]);
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(message["Titre du visionnage"])}&language=${language}`, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            }
          });

          const movieDetails = response.data.results.find(movie => movie.release_date.startsWith(message["Date de sortie"]));
          if (movieDetails) {
            console.log("📝 Détails du film trouvés, récupération des informations supplémentaires...");
            const movieDetailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}?language=${language}&append_to_response=credits`, {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
              }
            });

            const { poster_path, runtime } = movieDetailsResponse.data;
            const posterURL = `https://image.tmdb.org/t/p/original${poster_path}`;
            const duration = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "Durée inconnue";
            const mainActors = movieDetailsResponse.data.credits.cast.slice(0, 5).map(actor => actor.name).join(", ");
            const id = movieDetailsResponse.data.id;

            const newMovieDetails = {
              id,
              posterURL,
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
            console.log("🎬 Nouveaux détails du film ajoutés:", newMovieDetails);
          } else {
            console.log("❌ Aucun film trouvé correspondant au critère.");
          }
        } catch (error) {
          console.error("🚨 Erreur lors de la récupération des détails du film:", error);
        }
      });
    }
  }, [isLoading]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  const loadingAnimation = (
    <div className="flex justify-center items-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black-500"></div>
      <div className="text-white-500">Chargement...</div>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-9">
      <div className="p-1 w-full max-w-md">
        <div className="p-2 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <input
              className="w-full p-2 text-sm text-gray-500 focus:outline-none"
              placeholder="Exprimez vos désirs, trouvez le spectacle parfait..."
              type="text"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <button type="submit" className="mt-4 bg-black text-white p-2 rounded hover:bg-gray-700 focus:outline-none w-full">Rechercher</button>
          </form>
        </div>
      </div>
      {isLoading && loadingAnimation}
    </div>
  );
}
