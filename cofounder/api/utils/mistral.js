import { Mistral } from 'mistral';

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

async function inference(options) {
  const response = await mistral.inference({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await mistral.vectorize({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await mistral.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
