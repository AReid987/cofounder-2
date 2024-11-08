import cerebras from './cerebras';

describe('Cerebras Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'cerebras-base',
      messages: ['Hello, world!'],
    };
    const response = await cerebras.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'cerebras-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await cerebras.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await cerebras.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
