import fs from 'fs';
import LlamaCPP from 'llamacpp';

const llamacpp = new LlamaCPP({
  model: 'llamacpp',
});

async function inference(options) {
  const response = await llamacpp.inference({
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await llamacpp.vectorize({
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await llamacpp.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
