import Vibrant from 'node-vibrant';

// Exportation nommée pour la méthode GET
export async function GET({ request }) {
  // Vous devrez peut-être ajuster la récupération des paramètres selon votre cas d'usage
  const urlParams = new URL(request.url).searchParams;
  const imageUrl = urlParams.get('imageUrl');

  console.log('URL de l\'image:', imageUrl);

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "L'URL de l'image est requise" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const vibrant = new Vibrant(imageUrl);
    const palette = await vibrant.getPalette();
    const dominantColor = palette.Vibrant.getHex();

    return new Response(JSON.stringify({ dominantColor }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erreur lors de l\'extraction de la couleur:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'extraction de la couleur' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
