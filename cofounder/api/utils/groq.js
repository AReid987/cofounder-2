import OpenAI from "openai";

const client = new OpenAI({
  url: "https://api.groq.com",
  token: process.env.GROQ_API_KEY,
});

async function inference(options) {
  const response = await client.query({
    query: `query($input: String!) {
      vectorize(text: $input) {
        vector
      }
    }`,
    variables: { input: options.input },
  });
  return response.vectorize.vector;
}

// ... rest of the file remains the same ...
