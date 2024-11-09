import { GeminiClient } from '@google/generative-ai';

const client = new GeminiClient();

async function inference(options) {
  const response = await client.completions({
    model: options.model,
    messages: [
      { role: 'user', content: options.input },
    ],
  });
  return response;
}

async function vectorize(options) {
  // Note: Embedding is not shown in the example from the docs
  // You might need to check the official documentation for the correct method
  throw new Error('Embedding is not supported in this package');
}

async function transcribe(options) {
  // Note: Transcription is not shown in the example from the docs
  // You might need to use a different API or library for transcription
  throw new Error('Transcription is not supported in this package');
}

export default {
  inference,
  vectorize,
  transcribe,
};
