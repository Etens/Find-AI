"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus, faCircleXmark, faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Textarea } from "../../components/ui/textarea";
import { Progress } from "../../components/ui/progress";
import SearchOptionsList from "./search-options-list";


export default function SearchBar({ setAssistantContent, setMovieDetailsMDb }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [progressValue, setProgressValue] = useState(0);
  const [language, setLanguage] = useState("fr-FR");
  const [inputAnimation, setInputAnimation] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fetchOver, setFetchOver] = useState(false);

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
              const videosResponse = await axios.get(`/api/movie/trailers?id=${movieDetails.id}&language=${language}`);
              const movieCreditsResponse = await axios.get(`/api/movie/credits?id=${movieDetails.id}&language=${language}`);
              const actorImages = movieCreditsResponse.data.cast.slice(0, 5).map(actor => {
                return {
                  name: actor.name,
                  imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                };
              });
              const movieTrailers = videosResponse.data.trailerUrl;
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
                movieTrailers,
                duration,
                mainActors,
                actorImages,
                backdropURL: movieImages.backdropUrl,
                releaseDate: message["Date de sortie"],
                title: message["Titre"],
                description: message["Description courte"],
                emotion: message["Emotion"],
                note: message["Réputation Web"] || message["Reputation Web"],
                explication: message["Explication"],
                language: message["Langue du prompt"],
                origin : message["Origine"],
              };

              setMovieDetailsMDb((prevMovies) => [...prevMovies.filter((movie) => movie.id !== id), newMovieDetails]);
              console.log("Trailers response:", movieTrailers);
              console.log("Images Actor:", actorImages);
              setFetchOver(true);
              setTimeout(() => {
                setFetchOver(false);
              }, 4000);
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
    clearInput();
  };

  const clearInput = () => {
    handleInputChange({ target: { value: "" } });
    const textarea = document.querySelector(".pl-12");
    textarea.style.height = "inherit";
    setShowOptions(false);
    setSelectedOptions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const { value, selectionStart, selectionEnd } = e.target;
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
      clearInput();
    }
  };

  const handleInputHeight = (e) => {
    e.target.style.height = "inherit";
  };

  const handleOptionChange = (instruction, label) => {
    const existingOptionIndex = selectedOptions.findIndex((option) => option.label === label);
  
    let updatedInput = input;
  
    if (existingOptionIndex !== -1) {
      // Supprimez l'ancienne valeur de cette option de l'input
      updatedInput = updatedInput.replace(new RegExp("\\b" + selectedOptions[existingOptionIndex].value + "\\b", 'g'), '').trim();
  
      // Remplacez l'option par la nouvelle dans la liste des options sélectionnées
      const updatedOptions = selectedOptions.map((option, index) => 
        index === existingOptionIndex ? { label, value: instruction } : option
      );
      setSelectedOptions(updatedOptions);
  
      // Ajoutez la nouvelle option à l'input
      updatedInput = `${updatedInput} ${instruction}`.trim();
    } else {
      // Ajoutez la nouvelle option à l'input et à la liste des options sélectionnées
      updatedInput = `${updatedInput} ${instruction}`.trim();
      setSelectedOptions([...selectedOptions, { label, value: instruction }]);
    }
  
    handleInputChange({ target: { value: updatedInput } });
  };
  
  return (
    <div className="flex flex-col items-center pt-9">
      <div className="p-1 w-full max-w-xl">
        <div className="p-2 bg-black rounded-lg shadow-lg relative">
          <form onSubmit={handleFormSubmit} className="relative flex flex-col justify-between h-full">
            {console.log("Selected Options:", selectedOptions)}
            {console.log("Input:", input)}
            {console.log("Messages:", messages)}
            <div className="w-full">
              <Textarea
                className={`${inputAnimation} pl-12 pr-16 min-h-14 overflow-hidden resize-none`}
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
              <div className="absolute inset-y-0 left-0 flex flex-start pl-5 mt-4">
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="w-5 h-5 text-gray-500" />
              </div>
              {input && (
                <>
                  <div className="absolute inset-y-0 right-0 flex flex-start pr-3 mt-4 space-x-2">
                    <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 text-gray-500 cursor-pointer" onClick={clearInput} />
                    <FontAwesomeIcon icon={faCircleArrowDown} className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleFormSubmit} />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
        <SearchOptionsList handleOptionChange={handleOptionChange} showOptions={showOptions} setShowOptions={setShowOptions} />
      </div>
      {!fetchOver && isLoading && (
        <Progress value={progressValue} />
      )}
    </div>
  );
}