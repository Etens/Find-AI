import { OpenAIStream, StreamingTextResponse } from 'ai';
import MistralClient from '@mistralai/mistralai';

const client = new MistralClient(process.env.MISTRAL_API_KEY || '');

export async function POST(req) {
    try {
        const { messages } = await req.json();
        console.log('Requête reçue avec les messages suivants :', messages);

        const response = await client.chatStream({
            model: 'mistral-medium',
            stream: true,
            max_tokens: 1000,
            messages,
        });

        const stream = OpenAIStream(response);
        console.log('Réponse obtenue du chatStream :', stream);

        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API Mistral :', error);

        return new Response(JSON.stringify({ error: "Une erreur s'est produite lors de la communication avec l'API Mistral." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}