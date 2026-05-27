import { siteUrl } from './config';

describe('config', () => {
  it('exports siteUrl as a non-empty string', () => {
    expect(typeof siteUrl).toBe('string');
    expect(siteUrl.length).toBeGreaterThan(0);
  });
});
