import axios from 'axios';

export async function GET(req) {
  const id = req.nextUrl.searchParams.get('id');

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
      }
    });

    // Trie les backdrops par le nombre de votes (et secondairement par la note moyenne) décroissant
    const sortedBackdrops = response.data.backdrops.sort((a, b) => {
      return b.vote_count - a.vote_count || b.vote_average - a.vote_average;
    });

    // Sélectionne le backdrop le mieux noté
    const selectedBackdrop = sortedBackdrops.length > 0 ? sortedBackdrops[0] : null;
    const backdropUrl = selectedBackdrop ? `https://image.tmdb.org/t/p/original${selectedBackdrop.file_path}` : null;
    console.log('Selected Backdrop URL:', backdropUrl);

    return new Response(JSON.stringify({ backdropUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    return new Response(JSON.stringify({ message: "Erreur lors de la récupération des images" }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
