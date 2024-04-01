"use client";
import React, { useState } from "react";
import SearchBar from "../../components/component/search-bar";
import NavBar from "../../components/component/nav-bar";
import MovieCard from "../../components/component/movie-card";
import { Spotlight } from "../../components/ui/spotlight";

export default function Video() {
  const [assistantContent, setAssistantContent] = useState([]);
  const [movieDetailsMDb, setMovieDetailsMDb] = useState([]);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <Spotlight
        className="top-40 left-0 md:left-60 md:-top-20 z-50"
        fill="white"
      />
      <NavBar />
      <div className="flex flex-col bg-black/[0.96] antialiased bg-grid-white/[0.02] mt-20 mb-40">
        <div className=" p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Find <br /> imaginez trouvez regardez
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Votre imagination ouvre la porte à l'évasion cinématographique
            idéale. Dites adieu aux recherches, laissez-vous porter par
            l'inspiration.
          </p>
          <SearchBar
            setAssistantContent={setAssistantContent}
            assistantContent={assistantContent}
            setMovieDetailsMDb={setMovieDetailsMDb}
            movieDetailsMDb={movieDetailsMDb}
          />
        </div>
        <div className="grid grid-cols-1 gap-14 mt-11 w-full h-full p-4">
          {movieDetailsMDb
            .slice()
            .reverse()
            .map((movie, index) => (
              <MovieCard
                key={movie.id || index}
                title={movie.title}
                description={movie.description}
                emotion={movie.emotion}
                note={movie.note}
                explication={movie.explication}
                posterURL={movie.posterURL}
                backdropURL={movie.backdropURL}
                duration={movie.duration}
                mainActors={movie.mainActors}
                actorImages={movie.actorImages}
                date={movie.releaseDate}
                movieTrailers={movie.movieTrailers}
                origin={movie.origin}
                movieStreamings={movie.movieStreamings}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
