"use client";

import { Input } from "@/components/ui/input";
import { useChat } from 'ai/react';

export default function SearchBar() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div key="1" className="flex flex-col items-center py-9">
      <div className="p-1">
        <div className="p-2 bg-white rounded-lg shadow-lg w-96">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Express your desires, find the perfect show...."
              type="text"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <button type="submit" style={{ display: 'none' }}>Rechercher</button>
            {console.log(messages)}
          </form>
        </div>
      </div>
    </div>
  );
}