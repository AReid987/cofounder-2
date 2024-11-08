import axios from "axios";

const apiKey = process.env.XAI_API_KEY;
const apiUrl = "https://api.x.ai/v1";

async function inference({ model, input }) {
  const response = await axios.post(`${apiUrl}/inference`, {
    model,
    input,
  }, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  return response.data;
}

export default {
  inference,
};
