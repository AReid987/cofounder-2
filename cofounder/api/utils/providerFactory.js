import groq from './groq';
import cerebras from './cerebras';
import googleGemini from './googlegemini';
import mistral from './mistral';
import samabanova from './samabanova';
import togetherAI from './togetherai';
import xaiapi from './xaiapi';
import ollama from './ollama';
import mlxlm from './mlxlm';
import llamacpp from './llamacpp';

const providers = {
  groq,
  cerebras,
  googleGemini,
  mistral,
  samabanova,
  togetherAI,
  xaiapi,
  ollama,
  mlxlm,
  llamacpp,
};

function getProvider(name) {
  if (!providers[name]) {
    throw new Error(`Unknown provider: ${name}`);
  }
  return providers[name];
}

export default getProvider;
