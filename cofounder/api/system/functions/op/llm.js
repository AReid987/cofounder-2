import utils from "@/utils/index.js";

import dotenv from "dotenv";
dotenv.config();

const PROVIDERS = {
	openai: utils.openai,
	anthropic: utils.anthropic,
	groq: utils.groq,
	googlegemini: utils.googlegemini,
	mistral: utils.mistral,
	ollama: utils.ollama,
	togetherai: utils.togetherai,
	cerebras: utils.cerebras,
	xai: utils.xai,
	sambanova: utils.sambanova,
};

async function opLlmGen({ context, data }) {
	let { model, messages, preparser, parser, validate, query, stream, provider } =
		data;
	const { project, operation, streams } = context;

	// Setup streaming if operation key exists
	if (operation?.key && streams) {
		await streams.start({
			project,
			key: operation.key,
			meta: operation.meta,
		});
		stream = {
			write: async (data) => {
				streams.write({
					project,
					key: operation.key,
					data,
				});
			},
			cutoff: operation?.cutoff ? operation.cutoff : false,
		};
	}
	if (!stream) stream = process.stdout;

	// Add cofounder nickname if exists
	if (process.env.COFOUNDER_NICKNAME?.length) {
		messages[0].content = `you are : ${process.env.COFOUNDER_NICKNAME}\n${messages[0].content}`;
	}

	// Setup preparser
	if (!preparser) {
		preparser = async ({ text }) => {
			return { text };
		};
	} else if (preparser === `backticks`) {
		preparser = utils.parsers.extract.backticks;
	}

	// Setup parser
	if (!parser) {
		parser = async ({ generated, query }) => {
			return generated.text;
		};
	} else if (parser === `yaml`) {
		parser = utils.parsers.parse.yaml;
	}

	// Determine which LLM provider to use based on model name or explicit provider
	let llm_fn;
	if (provider) {
		// Use explicitly specified provider
		switch (provider.toLowerCase()) {
			case "openai":
				llm_fn = utils.openai.inference;
				break;
			case "anthropic":
				llm_fn = utils.anthropic.inference;
				break;
			case "googlegemini":
				llm_fn = utils.googlegemini.inference;
				break;
			case "groq":
				llm_fn = utils.groq.inference;
				break;
			case "mistral":
				llm_fn = utils.mistral.inference;
				break;
			case "ollama":
				llm_fn = utils.ollama.inference;
				break;
			case "cerebras":
				llm_fn = utils.cerebras.inference;
				break;
			case "togetherai":
				llm_fn = utils.togetherai.inference;
				break;
			default:
				throw new Error(`Unsupported provider: ${provider}`);
		}
	} else {
		// Determine provider from model name if no explicit provider
		if (model.startsWith("gpt-")) {
			llm_fn = utils.openai.inference;
		} else if (model.startsWith("claude-")) {
			llm_fn = utils.anthropic.inference;
		} else if (model.startsWith("gemini-")) {
			llm_fn = utils.googlegemini.inference;
		} else if (model.startsWith("llama-")) {
			llm_fn = utils.ollama.inference;
		} else {
			// Default to OpenAI if no match
			llm_fn = utils.openai.inference;
		}
	}

	try {
		const { text, usage } = await llm_fn({
			model,
			messages,
			stream,
			...data,
		});

		if (!text) {
			throw new Error("No text returned from LLM provider");
		}

		if (operation && streams) {
			await streams.end({
				project,
				key: operation.key,
			});
		}

		// Handle preparser
		let generated_pre;
		try {
			generated_pre = await preparser({ text });
		} catch (e) {
			console.error("Preparser error:", e);
			// If preparser fails, return raw text
			generated_pre = { text };
		}

		// Handle parser
		let generated_post;
		try {
			generated_post = await parser({
				generated: generated_pre,
				query,
			});
		} catch (e) {
			console.error("Parser error:", e);
			// If parser fails, return pre-parsed text
			generated_post = generated_pre.text;
		}

		// Handle validation
		if (validate) {
			try {
				await validate({ generated: generated_post });
			} catch (e) {
				console.error("Validation error:", e);
				throw e;
			}
		}

		return {
			generated: generated_post,
			usage,
		};
	} catch (error) {
		console.error("LLM Generation error:", {
			provider,
			model,
			error: error.message,
			stack: error.stack,
		});
		throw error;
	}
}

function chunkify(array, chunkSize) {
	const chunks = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize));
	}
	return chunks;
}

async function opLlmVectorizeChunk({ context, data }) {
	/* ;; op:LLM::VECTORIZE:CHUNK
		{texts} -> {vectors,usage}
		chunk processor (batches of 20)
		queue concurrency/lims defined for this one
	*/
	const { texts } = data;
	return await utils.openai.vectorize({
		texts,
	});
}
async function opLlmVectorize({ context, data }) {
	/* ;; op:LLM::VECTORIZE
		{texts} -> {vectors,usage}

		chunkify, process, flatten, return
	*/
	const { texts } = data;
	const chunks = chunkify(texts, 20);
	let usageAll = { prompt_tokens: 0, total_tokens: 0 };
	const vectorsAll = (
		await Promise.all(
			chunks.map(async (chunk) => {
				const { vectors, usage } = await context.run({
					id: `op:LLM::VECTORIZE:CHUNK`,
					context,
					data: { texts: chunk },
				});
				usageAll.prompt_tokens += usage.prompt_tokens;
				usageAll.total_tokens += usage.total_tokens;
				return vectors;
			}),
		)
	).flat();
	return {
		vectors: vectorsAll,
		usage: usageAll,
	};
}

async function opLlmDebugSimulate({ context, data }) {
	/*
		debug : simulate a stream
	*/
	const { project, operation } = context;

	console.dir(
		{
			opLlmDebugSimulate: { context, data },
		},
		{ depth: null },
	);

	const text_demo = `
# Deleuze & Guattari

Gilles Deleuze (1925-1995) was a French philosopher known for his influential works in metaphysics, aesthetics, and political theory. His ideas have significantly impacted various fields, including literature, film, and art.

## Key Concepts

### Rhizome
Deleuze, along with Félix Guattari, introduced the concept of the **rhizome** in their work *A Thousand Plateaus*. Unlike traditional tree-like structures of knowledge, a rhizome represents a non-hierarchical and interconnected model of thought. It emphasizes multiplicity and the idea that any point can connect to any other point.

### Difference and Repetition
In his book *Difference and Repetition*, Deleuze challenges the notion of identity and sameness. He argues that difference is fundamental to understanding reality, and repetition is not merely a return of the same but a process that produces new meanings.

### Becoming
Deleuze's notion of **becoming** refers to the process of transformation and change. It suggests that identity is not fixed but is always in a state of flux, influenced by various factors and experiences.

## Conclusion
Deleuze's philosophy encourages us to think beyond binary oppositions and embrace complexity. His work continues to inspire contemporary thought and artistic practices, making him a pivotal figure in modern philosophy.
	`;

	await context.streams.start({
		project,
		key: operation.key,
		meta: operation.meta,
	});
	const chunkSize = 20; // Define the size of each chunk
	let currentIndex = 0;

	while (currentIndex < text_demo.length) {
		const data = text_demo.slice(currentIndex, currentIndex + chunkSize); // send chunk by chunk
		context.streams.write({
			project,
			key: operation.key,
			data,
		});
		currentIndex += chunkSize; // Move to the next chunk
		await new Promise((resolve) => setTimeout(resolve, 100)); // Delay chunk by chunk
	}

	await context.streams.end({
		project,
		key: operation.key,
	});

	return {
		generated: text_demo,
		usage: {},
	};
}
export default {
	"op:LLM::GEN": opLlmGen,
	"op:LLM::VECTORIZE": opLlmVectorize,
	"op:LLM::VECTORIZE:CHUNK": opLlmVectorizeChunk,

	"op:LLM::DEBUG:SIMULATE": opLlmDebugSimulate,
};
