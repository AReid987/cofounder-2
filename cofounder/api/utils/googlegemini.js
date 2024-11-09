import { BetaClient } from '@google/generative-ai';

const client = new BetaClient({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

async function inference(options) {
  const response = await client.generateText({
    model: options.model,
    input: options.input,
  });
  return response;
}

async function vectorize(options) {
  const response = await client.embedText({
    model: options.model,
    input: options.input,
  });
  return response;
}

async function transcribe(options) {
  // Note: Transcription is not a direct method in the @google/generative-ai package
  // You might need to use a different API or library for transcription
  throw new Error('Transcription is not supported in this package');
}

export default {
  inference,
  vectorize,
  transcribe,
};
