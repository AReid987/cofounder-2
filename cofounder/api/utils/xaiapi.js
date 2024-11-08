import { XAI } from 'xai-api';

const xai = new XAI({
  apiKey: process.env.XAI_API_KEY,
});

async function inference(options) {
  const response = await xai.inference({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await xai.vectorize({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await xai.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
