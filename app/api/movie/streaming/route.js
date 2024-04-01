import axios from 'axios';
import { platform } from 'os';

export async function POST(req) {
  const title = req.nextUrl.searchParams.get('title');
  const mediaType = req.nextUrl.searchParams.get('mediaType');

  const options = {
    method: 'POST',
    url: 'https://watch-here.p.rapidapi.com/wheretowatch',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.WATCHHERE_API_KEY, 
      'X-RapidAPI-Host': 'watch-here.p.rapidapi.com'
    },
    data: {
      mediaType, // 'movie' ou 'tv show'
      title,
      platform: true,
    }
  };

  try {
    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
