import { SambaFlow } from 'sambaflow';

const client = new SambaFlow({
  apiKey: process.env.SAMABANOVA_API_KEY,
});

async function inference(options) {
  const response = await client.inference({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function vectorize(options) {
  const response = await client.vectorize({
    model: options.model,
    input: options.input,
  });
  return response.data;
}

async function transcribe(options) {
  const response = await client.transcribe({
    file: options.file,
  });
  return response.data;
}

async function toolCall(options) {
  throw new Error('Tool calling functionality is not implemented in the SambaNova API');
}

async function stream(options) {
  throw new Error('Streaming functionality is not implemented in the SambaNova API');
}

export default {
  inference,
  vectorize,
  transcribe,
  toolCall,
  stream,
};
