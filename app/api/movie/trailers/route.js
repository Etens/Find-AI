import axios from 'axios';

export async function GET(req) {
  const id = req.nextUrl.searchParams.get('id');
  const language = req.nextUrl.searchParams.get('language') || 'en-US'; // Utiliser 'en-US' comme langue par défaut

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=${language}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
      }
    });
    console.log('Trailers response:', response.data);
    console.log('ID:', id);

    // Filtre pour trouver les trailers YouTube
    const trailers = response.data.results.filter(video => video.site === "YouTube" && video.type === "Trailer");

    // Prépare l'URL du trailer (le premier trouvé sera utilisé)
    const trailerUrl = trailers.length > 0 ? `https://www.youtube.com/embed/${trailers[0].key}` : null;

    return new Response(JSON.stringify({ trailerUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching trailers:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération des trailers" }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
