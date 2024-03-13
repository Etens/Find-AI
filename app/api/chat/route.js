import { OpenAIStream, StreamingTextResponse } from 'ai';
import MistralClient from '@mistralai/mistralai';
const aiInstructionsData = require('./instructions.json');

const client = new MistralClient(process.env.MISTRAL_API_KEY);

const aiInstructionsContent = aiInstructionsData.content.join('\n');
const aiInstructions = {
    role: 'system',
    content: aiInstructionsContent
};

export async function POST(req) {
    try {
        const { messages } = await req.json();
        messages.unshift(aiInstructions);
        console.log('Messages sent to Mistral:', messages);

        const response = await client.chatStream({
            model: 'mistral-medium',
            stream: true,
            max_tokens: 1000,
            topP: 1,
            messages,
        });
        console.log('Response from Mistral:', response);

        const stream = OpenAIStream(response);
        console.log('StreamingTextResponse:', stream);
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error('Error calling Mistral API:', error);
        return new Response(JSON.stringify({ error: "An error occurred while communicating with the Mistral API." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
