import React from "react";
import SearchBar from "../components/component/sarch-bar";
import MovieCard from "../components/component/movie-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <VideoIcon className="w-20 h-20 shrink-0" />
      <h1 className="text-3xl font-bold tracking-tight">Video Find</h1>
      <p className="max-w-[600px] text-center text-gray-500 dark:text-gray-400 mt-4">
        Enter your search below to find movies, series, and more. Try typing "action", "romance", or the name of your
        favorite show!
      </p>
      <SearchBar />
      <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
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