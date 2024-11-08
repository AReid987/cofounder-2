import ollama from './ollama';

describe('Ollama Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'ollama-base',
      messages: ['Hello, world!'],
    };
    const response = await ollama.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'ollama-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await ollama.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await ollama.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
