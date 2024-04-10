import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("API Key Received:", process.env.OPENAI_API_KEY);

export const runtime = "edge";

const aiInstructionsData = require("./instructionsv2.json");

const instructionMessage = {
  role: "system",
  content:
    `Objectif: ${aiInstructionsData.introduction.goal}\n` +
    `Expertise: ${aiInstructionsData.introduction.expertise}\n` +
    `Premiere Requête: ${aiInstructionsData.introduction.first_request}\n` +
    `Format: ${aiInstructionsData.instructions.format}\n` +
    `Emphase sur l'émotion: ${aiInstructionsData.instructions.emphasis_on_emotion}\n` +
    `Variété dans les réponses: ${aiInstructionsData.instructions.variety_in_responses}\n` +
    `Structure: Langue du prompt - ${aiInstructionsData.instructions.structure.language_of_prompt}, ` +
    `Titre - ${aiInstructionsData.instructions.structure.title}, ` +
    `Description courte - ${aiInstructionsData.instructions.structure.brief_description}, ` +
    `Réputation Web - Note: ${aiInstructionsData.instructions.structure.web_reputation.note}, ` +
    `Explication: ${aiInstructionsData.instructions.structure.web_reputation.explanation}, ` +
    `Emotion - ${aiInstructionsData.instructions.structure.emotion}, ` +
    `Date de sortie - ${aiInstructionsData.instructions.structure.release_date}, ` +
    `Origine: ${aiInstructionsData.instructions.structure.origin}\n` +
    `Priorité: ${aiInstructionsData.priority}\n` +
    `Qualité: ${aiInstructionsData.quality}`,
};

export async function POST(req) {
  const { messages } = await req.json();
  console.log("Messages received from client:", messages);

  const messagesWithInstructions = [instructionMessage, ...messages];
  console.log("Messages with instructions:", messagesWithInstructions);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messagesWithInstructions,
    temperature: 1,
  });

  const stream = new OpenAIStream(response);
  console.log("Response from OpenAI:", response);

  return new StreamingTextResponse(stream);
}
