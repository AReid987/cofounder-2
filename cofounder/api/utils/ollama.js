import fs from 'fs';
import Ollama from 'ollama';

const ollama = new Ollama({
  model: 'ollama',
});

async function inference(options) {
  const response = await ollama.inference({
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await ollama.vectorize({
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await ollama.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
