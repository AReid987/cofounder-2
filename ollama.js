const apiKey = process.env.OLLAMA_API_KEY;
const apiUrl = "https://api.ollama.com/v1";

async function inference({ model, input }) {
  const response = await fetch(`${apiUrl}/inference`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": model,
      "input": input,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export default {
  inference,
};
