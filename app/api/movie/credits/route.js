export async function GET(req) {
    try {
      const id = req.nextUrl.searchParams.get('id');
      const language = req.nextUrl.searchParams.get('language') || 'en-US'; 
  
      const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`;
  
      const response = await fetch(creditsUrl, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Erreur lors de la requête vers MovieDB:', error);
      return new Response(JSON.stringify({ message: "Erreur interne du serveur" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  