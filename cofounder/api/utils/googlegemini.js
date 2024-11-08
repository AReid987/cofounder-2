import { GoogleGemini } from 'google-gemini';

const googleGemini = new GoogleGemini({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

async function inference(options) {
  const response = await googleGemini.inference({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await googleGemini.vectorize({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await googleGemini.transcribe({
    file: options.file,
  });
  return response.data;
}

export default {
  inference,
  vectorize,
  transcribe,
};
