import { Cerebras } from 'cerebras';

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

async function inference(options) {
  try {
    if (!options.model || !options.input) {
      throw new Error('Model and input are required');
    }
    const response = await cerebras.inference({
      model: options.model,
      input: options.input,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function vectorize(options) {
  try {
    if (!options.model || !options.input) {
      throw new Error('Model and input are required');
    }
    const response = await cerebras.vectorize({
      model: options.model,
      input: options.input,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function transcribe(options) {
  try {
    if (!options.file) {
      throw new Error('File is required');
    }
    const response = await cerebras.transcribe({
      file: options.file,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  inference,
  vectorize,
  transcribe,
};
