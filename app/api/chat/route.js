import { OpenAIStream, StreamingTextResponse } from 'ai';
import MistralClient from '@mistralai/mistralai';

const client = new MistralClient(process.env.MISTRAL_API_KEY || '');
const aiInstructionsData = require('./instructions.json');

// Créer l'objet d'instructions à envoyer
const aiInstructionsContent = aiInstructionsData.content.join('\n');
const aiInstructions = {
    role: 'system',
    content: aiInstructionsContent
};

export async function POST(req) {
    try {
        const { messages } = await req.json();
        messages.unshift(aiInstructions);
        console.log('Requête reçue avec les messages suivants :', messages);

        const response = await client.chatStream({
            model: 'mistral-medium',
            stream: true,
            max_tokens: 500,
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