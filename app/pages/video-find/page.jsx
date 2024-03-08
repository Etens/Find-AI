"use client";
import React, { useState } from 'react';
import SearchBar from "../../components/component/search-bar";
import NavBar from "../../components/component/nav-bar";
import MovieCard from '../../components/component/movie-card';

export default function Video() {
    const [assistantContent, setAssistantContent] = useState([]);
    const [movieDetailsMDb, setMovieDetailsMDb] = useState([]);

    return (
        <main className="flex flex-col items-center justify-between pb-24">
            <NavBar />
            <div className="px-24 flex flex-col items-center justify-center mt-20">
                <VideoIcon className="w-20 h-20 shrink-0" />
                <h1 className="text-3xl font-bold tracking-tight">Video Find</h1>
                <p className="max-w-[600px] text-center text-gray-500 dark:text-gray-400 mt-4">
                    Input your dream viewing experience to discover movies, series, documentary, and animations tailored to your imagination. Try phrases like 'heartwarming true story', 'finance drama series', or 'AI documentary'!
                </p>
                <SearchBar
                    setAssistantContent={setAssistantContent}
                    assistantContent={assistantContent}
                    setMovieDetailsMDb={setMovieDetailsMDb}
                    movieDetailsMDb={movieDetailsMDb}
                />
                <div className="grid grid-cols-3 gap-8 mt-12">
                    {movieDetailsMDb.map((movie, index) => (
                        <MovieCard
                            key={movie.id || index}
                            title={movie.title}
                            description={movie.description}
                            emotion={movie.emotion}
                            note={movie.note}
                            explication={movie.explication}
                            posterURL={movie.posterURL}
                            duration={movie.duration}
                            mainActors={movie.mainActors}
                            date={movie.releaseDate}
                        />
                    ))}
                </div>
            </div>
        </main>
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