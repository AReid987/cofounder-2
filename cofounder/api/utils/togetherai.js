import { TogetherClient } from '@togetherai/client';

const client = new TogetherClient({
  apiKey: process.env.TOGETHER_AI_API_KEY,
});

async function inference(options) {
  const response = await client.complete({
    model: options.model,
    prompt: options.input,
  });
  return response;
}

async function vectorize(options) {
  const response = await client.embed({
    model: options.model,
    input: options.input,
  });
  return response;
}

async function transcribe(options) {
  // Note: Transcription is not a direct method in the TogetherAI API
  // You might need to use a different API or library for transcription
  throw new Error('Transcription is not supported in this package');
}

export default {
  inference,
  vectorize,
  transcribe,
};
