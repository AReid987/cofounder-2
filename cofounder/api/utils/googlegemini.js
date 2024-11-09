import { GeminiClient } from '@google/generative-ai';

const client = new GeminiClient();

async function inference(options) {
  const response = await client.completions({
    model: options.model,
    messages: [
      { role: 'user', content: options.input },
    ],
  });
  return response;
}

async function stream(options) {
  const streamResponse = await client.chat.completions.create({
    model: options.model,
    messages: [
      { role: 'user', content: options.input },
    ],
    stream: true,
  });

  let output = '';
  for await (const chunk of streamResponse) {
    output += chunk.choices[0].delta.content;
  }
  return output;
}

async function toolCall(options) {
  const response = await client.chat.completions.create({
    model: options.model,
    messages: [
      { role: 'user', content: options.input },
    ],
    tools: options.tools,
    tool_choice: options.tool_choice || 'auto',
  });
  return response;
}

export default {
  inference,
  stream,
  toolCall,
  vectorize,
  transcribe,
};
