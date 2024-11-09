import Together from 'together-ai';

const together = new Together();

async function inference(options) {
  const response = await together.chat.completions.create({
    model: options.model,
    messages: [
      { role: 'user', content: options.input },
    ],
  });
  return response;
}

async function vectorize(options) {
  // Note: Embedding is not shown in the example from the docs
  // You might need to check the official documentation for the correct method
  throw new Error('Embedding is not supported in this example');
}

async function transcribe(options) {
  // Note: Transcription is not shown in the example from the docs
  // You might need to use a different API or library for transcription
  throw new Error('Transcription is not supported in this package');
}

async function stream(options) {
  const stream = await together.chat.completions.create({
    model: options.model,
    messages: [
      { role: 'user', content: options.input },
    ],
    stream: true,
  });

  let output = '';
  for await (const chunk of stream) {
    output += chunk.choices[0]?.delta?.content || '';
  }
  return output;
}

export default {
  inference,
  vectorize,
  transcribe,
  stream,
};
