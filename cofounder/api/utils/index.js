import parsers from "@/utils/parsers.js";
import openai from "@/utils/openai.js";
import vectra from "@/utils/vectra.js";
import render from "@/utils/render.js";
import firebase from "@/utils/firebase.js";
import storage from "@/utils/storage.js";
import load from "@/utils/load.js";
import anthropic from "@/utils/anthropic.js";
import xai from "@/utils/xai.js";
import cerebras from "@/utils/cerebras.js";
import groq from "@/utils/groq.js";
// *TODO - Add MLX LM
// import mlxlm from "@/utils/mlxlm.js";
import ollama from "@/utils/ollama.js";
// *TODO - Add Llama.cpp
// import llamacpp from "@/utils/llamacpp.js";
import togetherai from "@/utils/togetherai.js";
import googlegemini from "@/utils/googlegemini.js";
import mistral from "@/utils/mistral.js";
import samabanova from "@/utils/samabanova.js";

export default {
	parsers,
	openai,
	anthropic,
	vectra,
	render,
	firebase,
	storage,
	load,
	xai,
	cerebras,
	groq,
	// *TODO - Add MLX LM
	// mlxlm,
	ollama,
	// *TODO - Add Llama.cpp
	// llamacpp,
	togetherai,
	googlegemini,
	mistral,
	samabanova,
};
