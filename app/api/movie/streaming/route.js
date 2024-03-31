export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const streamingProvidersUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;

    const response = await fetch(streamingProvidersUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Erreur lors de la requête vers MovieDB pour les fournisseurs de streaming:", error);
    return new Response(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
