import axios from "axios";

const ollamaEndpoint = "http://localhost:11434/api/generate";

async function inference(options) {
  try {
    if (!options.model || !options.input) {
      throw new Error("Model and input are required");
    }
    const response = await axios.post(ollamaEndpoint, {
      model: options.model,
      prompt: options.input,
    }, {
      responseType: 'stream',
    });
    const chunks = [];
    response.data.on('data', (chunk) => {
      chunks.push(chunk.toString());
    });
    response.data.on('end', () => {
      const responses = chunks.map((chunk) => JSON.parse(chunk));
      const finalResponse = responses[responses.length - 1];
      return finalResponse;
    });
    response.data.on('error', (error) => {
      console.error(error);
      throw error;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function vectorize(options) {
  try {
    if (!options.model || !options.input) {
      throw new Error("Model and input are required");
    }
    throw new Error("Vectorization is not supported by the Ollama API");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function transcribe(options) {
  try {
    if (!options.file) {
      throw new Error("File is required");
    }
    throw new Error("Transcription is not supported by the Ollama API");
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
