import Groq from "groq-sdk";

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

async function inference({
	model = "groq-base",
	messages,
	stream = process.stdout,
}) {
	const response = await groq.inference({
		model,
		messages,
	});
	const text = response.data.text;
	stream.write(text);
	return {
		text,
	};
}

async function vectorize({ texts, model = "groq-base" }) {
	const response = await groq.vectorize({
		model,
		input: texts,
	});
	const vectors = response.data.vectors;
	return {
		vectors,
	};
}

async function transcribe({ path }) {
	const response = await groq.transcribe({
		file: path,
	});
	const transcript = response.data.transcript;
	return {
		transcript,
	};
}

export default {
	inference,
	vectorize,
	transcribe,
};
