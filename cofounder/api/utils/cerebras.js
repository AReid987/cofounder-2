import { CerebrasClient } from 'cerebras';

const cerebrasClient = new CerebrasClient({
  apiKey: process.env.CEREBRAS_API_KEY,
});

async function inference(options) {
  try {
    if (!options.model || !options.input) {
      throw new Error('Model and input are required');
    }
    const inputStream = cerebrasClient.createInputStream();
    const outputStream = cerebrasClient.createOutputStream();
    const responseStream = await cerebrasClient.runModelAsStream({
      model_name: options.model,
      input_stream: inputStream,
      output_stream: outputStream,
    });
    inputStream.write(options.input);
    inputStream.end();
    const response = await new Promise((resolve, reject) => {
      const chunks = [];
      responseStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      responseStream.on('end', () => {
        const response = Buffer.concat(chunks).toString();
        resolve(response);
      });
      responseStream.on('error', (error) => {
        reject(error);
      });
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
    const inputStream = cerebrasClient.createInputStream();
    const outputStream = cerebrasClient.createOutputStream();
    const responseStream = await cerebrasClient.runModelAsStream({
      model_name: options.model,
      input_stream: inputStream,
      output_stream: outputStream,
    });
    inputStream.write(options.input);
    inputStream.end();
    const response = await new Promise((resolve, reject) => {
      const chunks = [];
      responseStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      responseStream.on('end', () => {
        const response = Buffer.concat(chunks).toString();
        resolve(response);
      });
      responseStream.on('error', (error) => {
        reject(error);
      });
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
    // Note: The Cerebras Cloud SDK does not have a built-in transcription function.
    // You may need to use a different library or service for transcription.
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
