import { Client } from "@groq/groq";

const client = new Client({
  url: "https://api.groq.com",
  token: process.env.GROQ_API_KEY,
});

async function inference(options) {
  const response = await client.query({
    query: `query($input: String!) {
      answer(question: $input) {
        answer
      }
    }`,
    variables: { input: options.input },
  });
  return response.answer;
}

async function vectorize(options) {
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

async function transcribe(options) {
  throw new Error("Transcribe functionality is not implemented in this example");
}

export default {
  inference,
  vectorize,
  transcribe,
};
