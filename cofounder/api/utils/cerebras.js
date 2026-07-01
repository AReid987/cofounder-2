import { Cerebras } from "@cerebras/cerebras_cloud_sdk";

const client = new Cerebras({
	apiKey: process.env.CEREBRAS_API_KEY,
});

async function inference(options) {
	try {
		const { model, messages } = options;

		// Ensure all messages have valid roles
		const validMessages = messages.map((msg) => ({
			role: msg.role === "system" ? "user" : msg.role, // Convert 'system' to 'user' as Cerebras expects
			content: msg.content,
		}));

		// Call Cerebras API
		const response = await client.chat.completions.create({
			messages: validMessages,
			model: model || "llama3.1-70b",
			temperature: options.temperature || 0.7,
			max_tokens: options.max_tokens || 2048,
		});

		// Return formatted response
		return {
			text: response.choices[0].message.content,
			usage: response.usage || {
				prompt_tokens: 0,
				completion_tokens: 0,
				total_tokens: 0,
			},
		};
	} catch (error) {
		console.error("Cerebras inference error:", error);
		console.error("Request details:", {
			model: options.model,
			messageCount: options.messages?.length,
			firstMessageRole: options.messages?.[0]?.role,
		});
		throw error;
	}
}

async function stream(options) {
	try {
		const { model, messages } = options;

		const validMessages = messages.map((msg) => ({
			role: msg.role === "system" ? "user" : msg.role,
			content: msg.content,
		}));

		const response = await client.chat.completions.create({
			messages: validMessages,
			model: model || "llama3.1-70b",
			temperature: options.temperature || 0.7,
			max_tokens: options.max_tokens || 2048,
			stream: true,
		});

		let output = "";
		for await (const chunk of response) {
			const chunkText = chunk.choices[0]?.delta?.content || "";
			output += chunkText;

			if (options.stream?.write) {
				await options.stream.write(chunkText);
			}
		}

		return {
			text: output,
			usage: {
				prompt_tokens: 0,
				completion_tokens: 0,
				total_tokens: 0,
			},
		};
	} catch (error) {
		console.error("Cerebras stream error:", error);
		throw error;
	}
}

async function toolCall(options) {
	throw new Error("Function calling is not implemented for Cerebras models");
}

async function vectorize(options) {
	throw new Error(
		"Vectorize functionality is not implemented for Cerebras models",
	);
}

async function transcribe(options) {
	throw new Error(
		"Transcribe functionality is not implemented for Cerebras models",
	);
}

export default {
	inference,
	stream,
	toolCall,
	vectorize,
	transcribe,
};
