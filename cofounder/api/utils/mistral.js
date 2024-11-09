import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

async function inference(options) {
  const response = await client.chat.complete({
    model: options.model,
    messages: [{ role: 'user', content: options.input }],
  });
  return response.choices[0].message.content;
}

// ... rest of the file remains the same ...
