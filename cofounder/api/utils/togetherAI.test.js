import togetherAI from './togetherai';

describe('Together AI Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'together-ai-base',
      messages: ['Hello, world!'],
    };
    const response = await togetherAI.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'together-ai-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await togetherAI.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await togetherAI.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
