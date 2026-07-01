import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Map for model name standardization
const MODEL_MAPPING = {
	"gemini-1.5-pro": "gemini-pro",
	"gemini-1.5-flash": "gemini-flash",
	"gemini-1.0-pro": "gemini-pro",
	"gemini-pro": "gemini-pro",
	"gemini-pro-vision": "gemini-pro-vision",
};

// Map OpenAI roles to Gemini roles
function mapRole(role) {
	switch (role.toLowerCase()) {
		case "assistant":
		case "system":
			return "model";
		case "user":
			return "user";
		default:
			return "user"; // Default to user for unknown roles
	}
}

async function inference(options) {
	try {
		const modelName = MODEL_MAPPING[options.model] || "gemini-pro";
		const model = client.getGenerativeModel({ model: modelName });

		// Convert messages to Gemini format
		let formattedMessages;
		if (Array.isArray(options.messages)) {
			// Filter out system messages and map roles
			formattedMessages = options.messages
				.filter((msg) => msg.role.toLowerCase() !== "system")
				.map((msg) => ({
					role: mapRole(msg.role),
					parts: [{ text: msg.content }],
				}));

			// If no messages after filtering, use a default user message
			if (formattedMessages.length === 0) {
				formattedMessages = [
					{
						role: "user",
						parts: [{ text: options.input || "Hello" }],
					},
				];
			}
		} else if (options.input) {
			formattedMessages = [
				{
					role: "user",
					parts: [{ text: options.input }],
				},
			];
		} else {
			throw new Error("No input or messages provided");
		}

		// Ensure the last message is from the user
		if (formattedMessages[formattedMessages.length - 1].role !== "user") {
			if (options.input) {
				formattedMessages.push({
					role: "user",
					parts: [{ text: options.input }],
				});
			} else {
				// If no input provided, remove the last non-user message
				formattedMessages = formattedMessages.filter(
					(_, index) => index < formattedMessages.length - 1,
				);
			}
		}

		const result = await model.generateContent({
			contents: formattedMessages,
			generationConfig: {
				temperature: options.temperature || 0.7,
				topK: options.topK || 40,
				topP: options.topP || 0.95,
				maxOutputTokens: options.max_tokens || 2048,
			},
		});

		const response = await result.response;

		return {
			text: `\`\`\`\n${response.text()}\n\`\`\``,
			usage: {},
		};
	} catch (error) {
		console.error("Gemini inference error:", error);
		throw error;
	}
}

async function stream(options) {
	try {
		const modelName = MODEL_MAPPING[options.model] || "gemini-pro";
		const model = client.getGenerativeModel({ model: modelName });

		let formattedMessages;
		if (Array.isArray(options.messages)) {
			formattedMessages = options.messages
				.filter((msg) => msg.role.toLowerCase() !== "system")
				.map((msg) => ({
					role: mapRole(msg.role),
					parts: [{ text: msg.content }],
				}));
		} else if (options.input) {
			formattedMessages = [
				{
					role: "user",
					parts: [{ text: options.input }],
				},
			];
		}

		const result = await model.generateContentStream({
			contents: formattedMessages,
			generationConfig: {
				temperature: options.temperature || 0.7,
				topK: options.topK || 40,
				topP: options.topP || 0.95,
				maxOutputTokens: options.max_tokens || 2048,
			},
		});

		let output = "";
		for await (const chunk of result.stream) {
			const chunkText = chunk.text();
			output += chunkText;

			if (options.stream?.write) {
				await options.stream.write(chunkText);
			}
		}

		return {
			text: `\`\`\`\n${output}\n\`\`\``,
			usage: {},
		};
	} catch (error) {
		console.error("Gemini stream error:", error);
		throw error;
	}
}

async function toolCall(options) {
	try {
		const modelName = MODEL_MAPPING[options.model] || "gemini-pro";
		const model = client.getGenerativeModel({ model: modelName });

		let formattedMessages;
		if (Array.isArray(options.messages)) {
			formattedMessages = options.messages
				.filter((msg) => msg.role.toLowerCase() !== "system")
				.map((msg) => ({
					role: mapRole(msg.role),
					parts: [{ text: msg.content }],
				}));
		} else if (options.input) {
			formattedMessages = [
				{
					role: "user",
					parts: [{ text: options.input }],
				},
			];
		}

		const result = await model.generateContent({
			contents: formattedMessages,
			tools: options.tools,
			generationConfig: {
				temperature: options.temperature || 0.7,
				topK: options.topK || 40,
				topP: options.topP || 0.95,
				maxOutputTokens: options.max_tokens || 2048,
			},
		});

		const response = await result.response;

		return {
			text: `\`\`\`\n${response.text()}\n\`\`\``,
			usage: {},
		};
	} catch (error) {
		console.error("Gemini tool call error:", error);
		throw error;
	}
}

async function vectorize(options) {
	throw new Error(
		"Vectorize functionality requires using the OpenAI compatibility mode for Gemini API",
	);
}

async function transcribe(options) {
	throw new Error(
		"Transcribe functionality is not implemented in the Gemini API",
	);
}

export default {
	inference,
	stream,
	toolCall,
	vectorize,
	transcribe,
};
