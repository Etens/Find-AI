import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';

export default function SearchBar() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [assistantContent, setAssistantContent] = useState([]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const newAssistantContent = messages
        .filter(message => message.role === 'assistant').map(assistantMessage => {
          try {
            return JSON.parse(assistantMessage.content);
          } catch (error) {
            console.error('Error parsing assistant message content:', error);
            return null;
          }
        }).filter(content => content !== null);

      if (newAssistantContent.length > 0) {
        console.log('Final JSON Content from assistant:', newAssistantContent);
        setAssistantContent(newAssistantContent);
      }
    }
  }, [isLoading, messages]); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <div className="flex flex-col items-center py-9">
      <div className="p-1">
        <div className="p-2 bg-white rounded-lg shadow-lg w-96">
          <form onSubmit={handleFormSubmit}>
            <input className="w-full p-2 text-sm text-gray-500 focus:outline-none"
              placeholder="Express your desires, find the perfect show...."
              type="text"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <button type="submit" style={{ display: 'none' }}>Rechercher</button>
          </form>
        </div>
        {console.log('assistantContent', assistantContent)}
      </div>
      {isLoading && (
        <div className="p-2 bg-white rounded-lg shadow-lg w-96">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full" />
            <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full" />
            <div className="animate-pulse w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
