import { Cerebras } from 'cerebras';

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

async function inference(options) {
  const response = await cerebras.inference({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await cerebras.vectorize({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await cerebras.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
