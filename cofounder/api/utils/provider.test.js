import getProvider from './providerFactory';
import { expect } from 'expect';

describe('getProvider', () => {
  it('should return a provider', () => {
    const provider = getProvider('groq');
    expect(provider).toBeInstanceOf(Object);
  });

  it('should throw an error if provider is not found', () => {
    expect(() => getProvider('non-existent-provider')).toThrowError();
  });
});
