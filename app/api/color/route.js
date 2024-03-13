import axios from 'axios';
import Vibrant from 'node-vibrant';

export async function GET(req) {
    const imageUrl = req.nextUrl.searchParams.get('imageUrl');

    if (!imageUrl) {
        return new Response(JSON.stringify({ message: "Aucune URL d'image fournie" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });;
        const imageBuffer = Buffer.from(response.data, 'binary');
        const palette = await Vibrant.from(imageBuffer).getPalette();

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
