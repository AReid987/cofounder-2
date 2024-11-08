import mlxlm from './mlxlm';

describe('MLX LM Inference', () => {
  it('should return a response with text', async () => {
    const options = {
      model: 'mlxlm-base',
      messages: ['Hello, world!'],
    };
    const response = await mlxlm.inference(options);
    expect(response.text).toBeInstanceOf(String);
  });

  it('should return a response with vectors', async () => {
    const options = {
      model: 'mlxlm-base',
      texts: ['Hello, world!', 'This is a test.'],
    };
    const response = await mlxlm.vectorize(options);
    expect(response.vectors).toBeInstanceOf(Array);
  });

  it('should return a response with transcript', async () => {
    const options = {
      path: 'path/to/audio/file.wav',
    };
    const response = await mlxlm.transcribe(options);
    expect(response.transcript).toBeInstanceOf(String);
  });
});
