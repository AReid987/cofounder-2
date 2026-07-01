import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

async function inference(options) {
	const response = await client.chat.complete({
		model: options.model,
		messages: [{ role: "user", content: options.input }],
	});
	return response.choices[0].message.content;
}

async function toolCall(options) {
	throw new Error(
		"Tool calling functionality is not implemented in the Mistral API",
	);
}

async function stream(options) {
	throw new Error(
		"Streaming functionality is not implemented in the Mistral API",
	);
}

async function vectorize(options) {
	throw new Error(
		"Vectorize functionality is not implemented in the Mistral API",
	);
}

async function transcribe(options) {
	throw new Error(
		"Transcribe functionality is not implemented in the Mistral API",
	);
}

export default {
	inference,
	toolCall,
	stream,
	vectorize,
	transcribe,
};
