import samabanova from './samabanova';

describe('Samabanova Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'samabanova-base',
      messages: ['Hello, world!'],
    };
    const response = await samabanova.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'samabanova-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await samabanova.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await samabanova.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
