export async function GET(req) {
  try {
    const query = req.nextUrl.searchParams.get('query');
    const language = req.nextUrl.searchParams.get('language') || 'fr-FR'; // Fournit une valeur par défaut si non spécifié
    console.log("⚙️  Route de recherche de films activée");
    console.log("Recherche des films correspondant à la requête:", query);

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=${language}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    });
    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Erreur lors de la requête vers MovieDB:', error);
    return new Response(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
