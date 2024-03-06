import React, { useEffect, useState } from 'react';
import { useChat } from 'ai/react';

export default function SearchBar({ assistantContent, setAssistantContent }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const filteredAndParsedMessages = messages
        .filter(message => message.role === 'assistant')
        .map(assistantMessage => {
          try {
            return JSON.parse(assistantMessage.content);
          } catch (error) {
            console.error('Error parsing assistant message content:', error);
            return null;
          }
        })
        .filter(content => content !== null);
      setAssistantContent(filteredAndParsedMessages);
    }
  }, [isLoading, messages, setAssistantContent]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  const loadingAnimation = (
    <div className="flex justify-center items-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black-500"></div>
      <div className="text-white-500">Loading...</div>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-9">
      <div className="p-1 w-full max-w-md">
        <div className="p-2 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <input
              className="w-full p-2 text-sm text-gray-500 focus:outline-none"
              placeholder="Express your desires, find the perfect show...."
              type="text"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <button type="submit" className="mt-4 bg-black text-white p-2 rounded hover:bg-gray-700 focus:outline-none w-full">Search</button>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="p-2 mt-4 bg-white rounded-lg shadow-lg w-full max-w-md">
          {loadingAnimation}
        </div>
      )}
    </div>
  );
}
