import googleGemini from './googlegemini';

describe('Google Gemini Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'google-gemini-base',
      messages: ['Hello, world!'],
    };
    const response = await googleGemini.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'google-gemini-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await googleGemini.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await googleGemini.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
