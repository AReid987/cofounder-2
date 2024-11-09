import { OpenAI } from "openai";

const client = new OpenAI({
  base_url: "https://api.sambanova.ai/v1",
  api_key: process.env.SAMABANOVA_API_KEY,
});

async function inference(options) {
  const response = await client.inference({
    model: options.model,
    input: JSON.stringify({
      messages: [
        { role: "system", content: "Answer the question in a couple sentences." },
        { role: "user", content: options.input },
      ],
    }),
  });
  return response.data;
}

// ... rest of the file remains the same ...
