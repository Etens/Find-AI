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
  const [country, setCountry] = useState("US");
  const [isStreamingInfoLoaded, setIsStreamingInfoLoaded] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(e);
    clearInput();
    console.log("Selected Options:", selectedOptions);
    console.log("Input:", input);
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
      updatedInput = updatedInput.replace(new RegExp("\\b" + selectedOptions[existingOptionIndex].value + "\\b", 'g'), '').trim();

      const updatedOptions = selectedOptions.map((option, index) =>
        index === existingOptionIndex ? { label, value: instruction } : option
      );
      setSelectedOptions(updatedOptions);

      updatedInput = `${updatedInput} ${instruction}`.trim();
    } else {
      updatedInput = `${updatedInput} ${instruction}`.trim();
      setSelectedOptions([...selectedOptions, { label, value: instruction }]);
    }

    handleInputChange({ target: { value: updatedInput } });
  };

  useEffect(() => {
    const textarea = document.querySelector(".pl-12");
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [input]);

  useEffect(() => {
    let intervalId;
    if (isLoading && progressValue < 90) {
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
  }, [isLoading && !isStreamingInfoLoaded]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/country/');
        setCountry(await response.text());
      } catch (error) {
        console.error('Erreur lors de la récupération du pays:', error);
      }
    };
    fetchCountry();
  }, []);

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

      filteredAndParsedMessages.forEach(async (message) => {
        try {
          const response = await axios.get(`/api/movie/search?query=${encodeURIComponent(message["Titre"])}&language=${language}`);

          if (response.data.results.length > 0) {
            const movieDetails = response.data.results.find((movie) => movie.release_date.startsWith(message["Date de sortie"]));
            console.log("Movie Details:", movieDetails);

            if (movieDetails.id) {
              const movieDetailsResponse = await axios.get(`/api/movie/details?id=${movieDetails.id}&language=${language}`);
              const movieImagesResponse = await axios.get(`/api/movie/posters?id=${movieDetails.id}`);
              const movieTrailersResponse = await axios.get(`/api/movie/trailers?id=${movieDetails.id}&language=${language}`);
              const movieCreditsResponse = await axios.get(`/api/movie/credits?id=${movieDetails.id}&language=${language}`);
              const movieStreamingsResponse = await axios.get(`/api/movie/streamings?id=${movieDetails.id}`);
              const actorImages = movieCreditsResponse.data.cast.slice(0, 5).map(actor => {
                return {
                  name: actor.name,
                  imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                };
              });
              const movieTrailers = movieTrailersResponse.data.trailerUrl;
              const movieImages = movieImagesResponse.data;
              const movieStreamings = movieStreamingsResponse.data.results;
              const movieStreamingsForCountry = movieStreamings[country];
              const { poster_path, runtime } = movieDetailsResponse.data;
              const posterURL = `https://image.tmdb.org/t/p/original${poster_path}`;
              const duration = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "Durée inconnue";
              const mainActors = movieDetailsResponse.data.credits.cast
                .slice(0, 5)
                .map((actor) => actor.name)
                .join(", ");
              const id = movieDetailsResponse.data.id;
              const timeGenerated = new Date().toISOString();
              console.log("Movie Streamings:", movieStreamings);
              console.log("Movie Streamings for country:", movieStreamingsForCountry);
              console.log("Country:", country);
              console.log("Date Generated:", timeGenerated);

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
                origin: message["Origine"],
                movieStreamingsForCountry,
                time: timeGenerated
              };

              setMovieDetailsMDb((prevMovies) => [newMovieDetails, ...prevMovies.filter((movie) => movie.id !== id)]);
              setFetchOver(true);
              setIsStreamingInfoLoaded(true); 
              setTimeout(() => {
                setFetchOver(false);
                setIsStreamingInfoLoaded(false); 
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
  }, [isLoading, messages]);


  return (
    <div className="flex flex-col items-center pt-9">
      <div className="p-1 w-full max-w-xl">
        <div className="p-2 bg-black rounded-lg shadow-lg relative">
          <form onSubmit={handleFormSubmit} className="relative flex flex-col justify-between h-full">
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