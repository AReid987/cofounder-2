import groq from './groq';

describe('Groq Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'groq-base',
      messages: ['Hello, world!'],
    };
    const response = await groq.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'groq-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await groq.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await groq.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
