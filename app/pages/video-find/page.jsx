"use client";
import React, { useState } from 'react';
import SearchBar from "../../components/component/search-bar";
import NavBar from "../../components/component/nav-bar";
import MovieCard from '../../components/component/movie-card';
import { Spotlight } from "../../components/ui/spotlight";

export default function Video() {
    const [assistantContent, setAssistantContent] = useState([]);
    const [movieDetailsMDb, setMovieDetailsMDb] = useState([]);

    return (
        <main className="flex flex-col items-center justify-center w-full h-full">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <NavBar />
            <div className="flex flex-col h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden ">
                <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        Find <br /> imaginez trouvez regardez
                    </h1>
                    <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    Vos idées deviennent des découvertes instantanées. Décrit par votre imagination, notre IA sélectionne le film ou la série parfaite en un instant. 
                    Finies les recherches sans fin, votre prochaine aventure vidéo n'attend que votre vision.               
                    </p>
                    <SearchBar
                        setAssistantContent={setAssistantContent}
                        assistantContent={assistantContent}
                        setMovieDetailsMDb={setMovieDetailsMDb}
                        movieDetailsMDb={movieDetailsMDb}
                    />
                </div>
                <div className="grid grid-cols-1 gap-8 mt-12 w-full">
                    {movieDetailsMDb.slice().reverse().map((movie, index) => (
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
                            date={movie.releaseDate}
                        />
                    ))}
                </div>
            </div>
        </main >
    );
}

function VideoIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
        </svg>)
    );
}