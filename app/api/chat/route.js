import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Création du client API OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

console.log('API Key Received:', process.env.OPENAI_API_KEY);

export const runtime = 'edge';

// Chargement du fichier d'instructions
const aiInstructionsData = require('./instructionsv2.json');

// Préparation du message d'instruction basé sur le fichier JSON
const instructionMessage = {
    role: "system",
    content: `Objectif: ${aiInstructionsData.introduction.goal}\n` +
        `Expertise: ${aiInstructionsData.introduction.expertise}\n` +
        `Format: ${aiInstructionsData.instructions.format}\n` +
        `Structure: Langue du prompt - ${aiInstructionsData.instructions.structure.language_of_prompt}, ` +
        `Titre - ${aiInstructionsData.instructions.structure.title}, ` +
        `Description courte - ${aiInstructionsData.instructions.structure.brief_description}, ` +
        `Réputation Web - Note: ${aiInstructionsData.instructions.structure.web_reputation.note}, ` +
        `Explication: ${aiInstructionsData.instructions.structure.web_reputation.explanation}\n` +
        `Emotion - ${aiInstructionsData.instructions.structure.emotion}\n` +
        `Date de sortie - ${aiInstructionsData.instructions.structure.release_date}\n` +
        `Priorité: ${aiInstructionsData.priority}\n` +
        `Qualité: ${aiInstructionsData.quality}`
};

export async function POST(req) {
    const { messages } = await req.json();
    console.log('Messages received from client:', messages);

    // Ajout des instructions au début des messages
    const messagesWithInstructions = [instructionMessage, ...messages];
    console.log('Messages with instructions:', messagesWithInstructions);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messagesWithInstructions,
    });

    const stream = new OpenAIStream(response);
    console.log('Response from OpenAI:', response);

    // Retourne la réponse sous forme de stream
    return new StreamingTextResponse(stream);
} 