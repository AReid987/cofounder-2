import { GroqClient } from "groq-sdk";

const client = new GroqClient({
  apiKey: process.env.GROQ_API_KEY,
});

async function inference({
  model = "groq-base",
  messages,
  stream = process.stdout,
}) {
  const response = await client.query({
    query: `query($messages: [String!]!) {
      inference(model: "${model}", messages: $messages) {
        text
      }
    }`,
    variables: { messages },
  });
  const text = response.data.inference.text;
  stream.write(text);
  return {
    text,
  };
}

async function vectorize({ texts, model = "groq-base" }) {
  const response = await client.query({
    query: `query($texts: [String!]!, $model: String!) {
      vectorize(model: $model, input: $texts) {
        vectors
      }
    }`,
    variables: { texts, model },
  });
  const vectors = response.data.vectorize.vectors;
  return {
    vectors,
  };
}

async function transcribe({ path }) {
  const response = await client.query({
    query: `query($file: Upload!) {
      transcribe(file: $file) {
        transcript
      }
    }`,
    variables: { file: await client.uploadFile(path) },
  });
  const transcript = response.data.transcribe.transcript;
  return {
    transcript,
  };
}

export default {
  inference,
  vectorize,
  transcribe,
};
