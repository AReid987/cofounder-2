import xaiapi from './xaiapi';

describe('X AI API Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'xai-api-base',
      messages: ['Hello, world!'],
    };
    const response = await xaiapi.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'xai-api-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await xaiapi.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await xaiapi.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
