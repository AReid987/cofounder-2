// *TODO - Add test for Llama.cpp
// import llamacpp from './llamacpp';

// describe('Llama CPP Inference', () => {
//   it('should return a response with text', async () => {
//     const options = {
//       model: 'llamacpp-base',
//       messages: ['Hello, world!'],
//     };
//     const response = await llamacpp.inference(options);
//     expect(response.text).toBeInstanceOf(String);
//   });

//   it('should return a response with vectors', async () => {
//     const options = {
//       model: 'llamacpp-base',
//       texts: ['Hello, world!', 'This is a test.'],
//     };
//     const response = await llamacpp.vectorize(options);
//     expect(response.vectors).toBeInstanceOf(Array);
//   });

//   it('should return a response with transcript', async () => {
//     const options = {
//       path: 'path/to/audio/file.wav',
//     };
//     const response = await llamacpp.transcribe(options);
//     expect(response.transcript).toBeInstanceOf(String);
//   });
// });
