import { CerebrasClient } from 'cerebras';

const cerebrasClient = new CerebrasClient({
  apiKey: process.env.CEREBRAS_API_KEY,
});

async function inference(options) {
  try {
    if (!options.model || !options.input) {
      throw new Error('Model and input are required');
    }
    const response = await cerebrasClient.runModel({
      model_name: options.model,
      inputs: [options.input],
    });
    return response;
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
    const response = await cerebrasClient.runModel({
      model_name: options.model,
      inputs: [options.input],
    });
    return response;
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
    throw new Error('Transcription is not supported by the Cerebras Cloud SDK');
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
