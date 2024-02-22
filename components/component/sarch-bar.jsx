"use client";
import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); try {
      const response = await axios.post('/api/chat', {
        messages: [
          {
            role: "user",
            content: searchTerm
          }
        ]
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la requête à OpenAI :', error);
    }
  }

  return (
    <div key="1" className="flex flex-col items-center py-9">
      <div className="p-1">
        <div className="p-2 bg-white rounded-lg shadow-lg w-96">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Express your desires, find the perfect show...."
              type="search"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
            <button type="submit" style={{ display: 'none' }}>Rechercher</button>
          </form>
        </div>
      </div>
    </div>
  );
}