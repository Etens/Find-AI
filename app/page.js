"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./components/component/nav-bar";
import SearchBar from "./components/component/search-bar";
import MovieCard from "./components/component/movie-card";
import { Spotlight } from "./components/ui/spotlight";
import { Skeleton } from "./components/ui/skeleton";

export default function Home() {
  const [assistantContent, setAssistantContent] = useState([]);
  const [movieDetailsMDb, setMovieDetailsMDb] = useState([]);
  const [mobileDevice, setMobileDevice] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = "(hover: none) and (pointer: coarse)";
    setMobileDevice(window.matchMedia(query).matches);
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] mt-32">
        <Skeleton className="h-16 w-1/5" />
        <Skeleton className="h-12 w-2/4 mt-2" />
        <Skeleton className="h-5 w-1/4 mt-4" />
        <Skeleton className="h-5 w-1/4 mt-2" />
        <Skeleton className="h-3 w-1/3 mt-2" />
        <Skeleton className="h-10 w-1/3 mt-4" />
        <Skeleton className="h-5 w-1/6 mt-4" />
        <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-60 h-80 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  if (!mobileDevice) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <Spotlight className="top-40 left-0 md:left-60 md:-top-20 z-50" fill="white" />
        <NavBar />
        <div className="flex flex-col bg-black/[0.96] antialiased bg-grid-white/[0.02] mb-40">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative w-full mt-5">
            <h1 className="text-5xl lg:text-7xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 sm:mb-2 mb-1">Find</h1>
            <h2 className="text-4xl lg:text-6xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 sm:mb-6 mb-3">imaginez trouvez regardez</h2>
            <p className="mt-4 font-normal lg:text-base text-xs text-neutral-300 max-w-lg text-center mx-auto">Votre imagination ouvre la porte à l&apos;évasion cinématographique idéale. Dites adieu aux recherches, laissez-vous porter par l&apos;inspiration.</p>
            <p className="mt-4 font-normal text-xs text-neutral-300 max-w-lg text-center mx-auto">Vous manquez d&apos;idées ? Laissez-vous guider par les options de recherche ci-dessous.</p>
            <SearchBar setAssistantContent={setAssistantContent} assistantContent={assistantContent} setMovieDetailsMDb={setMovieDetailsMDb} movieDetailsMDb={movieDetailsMDb} />
          </div>
          <div className="grid grid-cols-1 gap-14 mt-6 w-full h-full z-40 p-4 sm:p-6 md:p-8 mx-auto">
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
  return (
    <main className="flex flex-col items-center justify-center w-full h-full mt-32 p-5">
      <div className="flex flex-col bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <h1 className="text-5xl lg:text-7xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 sm:mb-2 mb-1">Find</h1>
        <h2 className="mt-5 text-lg lg:text-6xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 sm:mb-6 mb-3">Cette application est pas encore optimisée pour les appareils mobiles. Veuillez utiliser un ordinateur.</h2>
        <img src="/software-engineer-animate.svg" alt="software engineer" className="w-96 h-96 mx-auto" />
      </div>
    </main>
  );
}
