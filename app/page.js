"use client";

import React, { useState } from "react";
import NavBar from "./components/component/nav-bar";
import SearchBar from "./components/component/search-bar";
import MovieCard from "./components/component/movie-card";
import { Spotlight } from "./components/ui/spotlight";

export default function Home() {
  const [assistantContent, setAssistantContent] = useState([]);
  const [movieDetailsMDb, setMovieDetailsMDb] = useState([]);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <Spotlight className="top-40 left-0 md:left-60 md:-top-20 z-50" fill="white" />
      <NavBar />
      <div className="flex flex-col bg-black/[0.96] antialiased bg-grid-white/[0.02] mt-48 mb-40">
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto relative w-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-10">
            Find <br /> imaginez trouvez regardez
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">Votre imagination ouvre la porte à l'évasion cinématographique idéale. Dites adieu aux recherches, laissez-vous porter par l'inspiration.</p>
          <SearchBar setAssistantContent={setAssistantContent} assistantContent={assistantContent} setMovieDetailsMDb={setMovieDetailsMDb} movieDetailsMDb={movieDetailsMDb} />
        </div>
        <div className="grid grid-cols-1 gap-14 mt-11 w-full h-full z-40 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          {movieDetailsMDb
            .slice()
            .reverse()
            .map((movie, index) => (
              <MovieCard key={movie.id || index} title={movie.title} description={movie.description} emotion={movie.emotion} note={movie.note} explication={movie.explication} posterURL={movie.posterURL} backdropURL={movie.backdropURL} duration={movie.duration} mainActors={movie.mainActors} actorImages={movie.actorImages} date={movie.releaseDate} movieTrailers={movie.movieTrailers} origin={movie.origin} movieStreamingsForCountry={movie.movieStreamingsForCountry} />
            ))}
        </div>
      </div>
    </main>
  );
}
