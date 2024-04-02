import axios from 'axios';

export async function GET(req) {
  const id = req.nextUrl.searchParams.get('id'); // Assurez-vous que 'id' est l'ID du film TMDb

  const tmdbUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
  
  try {
    const tmdbResponse = await axios.get(tmdbUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return new Response(JSON.stringify(tmdbResponse.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur lors de la requête vers TMDb:', error);
    return new Response(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
