import { TogetherAI } from 'together-ai';

const togetherAI = new TogetherAI({
  apiKey: process.env.TOGETHER_AI_API_KEY,
});

async function inference(options) {
  const response = await togetherAI.inference({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await togetherAI.vectorize({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await togetherAI.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
