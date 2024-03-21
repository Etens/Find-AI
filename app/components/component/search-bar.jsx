"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus, faCircleXmark, faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faFilm as iconMedia, faLaughBeam as iconFunny, faStar as iconExcellent, faHourglassEnd as iconDuration, faGlobeEurope as iconFrench, faFire as iconPopular, faCalendarAlt as icon2020s, faUsers as iconKids, faBuilding as iconIndie } from "@fortawesome/free-solid-svg-icons";
import { Textarea } from "../../components/ui/textarea";
import { Progress } from "../../components/ui/progress";
import { SearchOptions } from "../component/search-options";

export default function SearchBar({ setAssistantContent, setMovieDetailsMDb }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [progressValue, setProgressValue] = useState(0);
  const [language, setLanguage] = useState("fr-FR");
  const [inputAnimation, setInputAnimation] = useState("");

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      setProgressValue(1);
      intervalId = setInterval(() => {
        setProgressValue((oldValue) => {
          const randomChoice = Math.random();
          let randomIncrease;
          if (randomChoice < 0.8) {
            randomIncrease = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
          } else {
            randomIncrease = Math.floor(Math.random() * (25 - 16 + 1)) + 16;
          }
          const newValue = oldValue + randomIncrease;
          return newValue > 90 ? 90 : newValue;
        });
      }, 400);
    } else {
      setProgressValue(100);
      setTimeout(() => setProgressValue(0), 1000);
    }

    return () => clearInterval(intervalId);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const assistantMessages = messages.filter((message) => message.role === "assistant");

      const filteredAndParsedMessages = assistantMessages
        .map((assistantMessage) => {
          const formattedContent = assistantMessage.content.replace(/\\n/g, "").trim();
          try {
            return JSON.parse(formattedContent);
          } catch (error) {
            console.error("Erreur lors du parsing du contenu du message de l'assistant:", error);
            return null;
          }
        })
        .filter((content) => content !== null);

      setAssistantContent(filteredAndParsedMessages);
      console.log("Messages de l'assistant filtrés et parsés:", filteredAndParsedMessages);

      filteredAndParsedMessages.forEach(async (message) => {
        try {
          const response = await axios.get(`/api/movie/search?query=${encodeURIComponent(message["Titre"])}&language=${language}`);

          if (response.data.results.length > 0) {
            const movieDetails = response.data.results.find((movie) => movie.release_date.startsWith(message["Date de sortie"]));

            if (movieDetails.id) {
              const movieDetailsResponse = await axios.get(`/api/movie/details?id=${movieDetails.id}&language=${language}`);
              const movieImagesResponse = await axios.get(`/api/movie/posters?id=${movieDetails.id}`);
              const movieImages = movieImagesResponse.data;
              const { poster_path, runtime } = movieDetailsResponse.data;
              const posterURL = `https://image.tmdb.org/t/p/original${poster_path}`;
              const duration = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "Durée inconnue";
              const mainActors = movieDetailsResponse.data.credits.cast
                .slice(0, 5)
                .map((actor) => actor.name)
                .join(", ");
              const id = movieDetailsResponse.data.id;

              const newMovieDetails = {
                id,
                posterURL,
                duration,
                mainActors,
                backdropURL: movieImages.backdropUrl,
                releaseDate: message["Date de sortie"],
                title: message["Titre"],
                description: message["Description courte"],
                emotion: message["Emotion"],
                note: message["Réputation Web"] || message["Reputation Web"],
                explication: message["Explication"],
                language: message["Langue du prompt"],
              };

              setMovieDetailsMDb((prevMovies) => [...prevMovies.filter((movie) => movie.id !== id), newMovieDetails]);

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
    handleSubmit(e);
  };

  const clearInput = () => {
    handleInputChange({ target: { value: "" } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
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
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputHeight = (e) => {
    e.target.style.height = "inherit";
    const computed = window.getComputedStyle(e.target);
    const totalHeight = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
      + e.target.scrollHeight;

    e.target.style.height = `${totalHeight}px`;
  };

  return (
    <div className="flex flex-col items-center py-9">
      <div className="p-1 w-full max-w-md">
        <div className="p-2 bg-black rounded-lg shadow-lg relative">
          <form onSubmit={handleFormSubmit} className="flex items-center">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="w-5 h-5 absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Textarea
              className={`${inputAnimation}`}
              placeholder="Imaginez..."
              value={input}
              onChange={(e) => {
                handleInputChange(e); 
                handleInputHeight(e); 
              }}
              onKeyDown={handleKeyDown}
              autoFocus 
              rows={1}
              style={{ boxShadow: "0 0px 30px -15px white" }}
            />
            {input && (
              <>
                <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={clearInput} />
                <FontAwesomeIcon icon={faCircleArrowDown} className="w-5 h-5 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={handleFormSubmit} />
              </>
            )}
          </form>
        </div>
        <div className="flex flex-nowrap justify-center mt-3 space-x-2 text-xs text-gray-300 max-w-full">
          <SearchOptions
            label="Type de Médias"
            options={[
              { value: "film", label: "Film" },
              { value: "series", label: "Série" },
              { value: "anime", label: "Animé" },
              { value: "documentary", label: "Documentaire" },
            ]}
            buttonIcon={iconMedia}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Note"
            options={[
              { value: "excellent", label: "Excellent" },
              { value: "good", label: "Bon" },
              { value: "average", label: "Moyen" },
              { value: "poor", label: "Mauvais" },
              { value: "disastrous", label: "Désastreux" },
            ]}
            buttonIcon={iconExcellent}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Durée"
            options={[
              { value: "short", label: "1h" },
              { value: "medium", label: "2h" },
              { value: "long", label: "3h" },
            ]}
            buttonIcon={iconDuration}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Emotion"
            options={[
              { value: "laughter", label: "Rire" },
              { value: "sadness", label: "Emouvant" },
              { value: "fear", label: "Peur" },
              { value: "motivation", label: "Motivation" },
              { value: "love", label: "Amour" },
              { value: "reflection", label: "Réflexion" },
              { value: "adrenaline", label: "Adrénaline" },
              { value: "wonder", label: "Émerveillement" },
              { value: "thrill", label: "Frisson" },
            ]}
            buttonIcon={iconFunny}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Popularité"
            options={[
              { value: "popular", label: "Populaire" },
              { value: "unpopular", label: "Peu Populaire" },
              { value: "unknown", label: "Inconnue" },
            ]}
            buttonIcon={iconPopular}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Décennie"
            options={[
              { value: "2020s", label: "Années 2020" },
              { value: "2010s", label: "Années 2010" },
              { value: "2000s", label: "Années 2000" },
              { value: "90s", label: "Années 90" },
              { value: "older", label: "Années 80 et avant" },
            ]}
            buttonIcon={icon2020s}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Public"
            options={[
              { value: "kids", label: "Enfants" },
              { value: "teens", label: "Adolescents" },
              { value: "adults", label: "Adultes" },
            ]}
            buttonIcon={iconKids}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Studio de Production"
            options={[
              { value: "indie", label: "Indépendant" },
              { value: "large", label: "Grand Studio" },
            ]}
            buttonIcon={iconIndie}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
          <SearchOptions
            label="Origine de Production"
            options={[
              { value: "us", label: "Hollywood (États-Unis)" },
              { value: "uk", label: "Britannique" },
              { value: "france", label: "Français" },
              { value: "india", label: "Bollywood (Inde)" },
              { value: "korea", label: "Coréen" },
              { value: "japan", label: "Japonais" },
              { value: "china", label: "Chinois" },
              { value: "italy", label: "Italien" },
              { value: "spain", label: "Espagnol" },
              { value: "international", label: "International" },
            ]}
            buttonIcon={iconFrench}
            onInstructionChange={(instruction) => {
              const newValue = `${input} ${instruction}`.trim();
              handleInputChange({ target: { value: newValue } });
              setInputAnimation('animate-flash');
              setTimeout(() => setInputAnimation(''), 300);
            }}
          />
        </div>
        {isLoading && <Progress value={progressValue} />}
      </div>
    </div>
  );
}
