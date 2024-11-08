import mistral from './mistral';

describe('Mistral Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'mistral-base',
      messages: ['Hello, world!'],
    };
    const response = await mistral.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'mistral-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await mistral.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await mistral.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
