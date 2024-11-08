import axios from "axios";

const ollamaEndpoint = "http://localhost:11434";

async function inference(options) {
  try {
    if (!options.input) {
      throw new Error("Input is required");
    }
    const response = await axios.post(ollamaEndpoint, {
      input: options.input,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function vectorize(options) {
  throw new Error("Vectorization is not supported by the Ollama API");
}

async function transcribe(options) {
  throw new Error("Transcription is not supported by the Ollama API");
}

export default {
  inference,
  vectorize,
  transcribe,
};
