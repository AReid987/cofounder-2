import getProvider from './providerFactory';

describe('Provider Factory', () => {
  it('should return a provider instance', () => {
    const provider = getProvider('groq');
    expect(provider).toBeInstanceOf(Object);
  });

  it('should throw an error for an unknown provider', () => {
    expect(() => getProvider('unknown')).toThrowError();
  });
});
