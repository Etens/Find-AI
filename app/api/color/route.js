import axios from 'axios';
import Vibrant from 'node-vibrant';

export async function GET(req) {
    const imageUrl = req.nextUrl.searchParams.get('imageUrl');
    console.log("URL de l'image reçue pour l'extraction de couleur:", imageUrl);

    if (!imageUrl) {
        console.error('Aucune URL d\'image fournie pour l\'extraction de la couleur');
        return new Response(JSON.stringify({ message: "Aucune URL d'image fournie" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        console.log('Tentative de téléchargement de l\'image...');
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });
        console.log('Image téléchargée avec succès');

        const imageBuffer = Buffer.from(response.data, 'binary');
        console.log('Buffer de l\'image créé');

        console.log('Tentative d\'extraction de la couleur dominante...');
        // Utilisez Vibrant sur le buffer de l'image
        const palette = await Vibrant.from(imageBuffer).getPalette();
        console.log('Palette extraite:', palette);

        // Choisissez la couleur dominante que vous préférez de la palette
        const vibrantColor = palette.Vibrant ? palette.Vibrant.hex : '#ffffff';
        console.log('Couleur Vibrant extraite:', vibrantColor);

        return new Response(JSON.stringify({ dominantColor: vibrantColor }),
            { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Erreur lors de l\'extraction de la couleur:', error);

        let messageErreur = "Erreur interne du serveur";
        let statusCode = 500;

        if (error.response) {
            messageErreur = "Erreur lors du téléchargement de l'image";
            statusCode = error.response.status;
        } else {
            messageErreur = "Erreur lors de l'utilisation de Vibrant";
        }

        return new Response(JSON.stringify({ message: messageErreur }),
            { status: statusCode, headers: { 'Content-Type': 'application/json' } });
    }
}
