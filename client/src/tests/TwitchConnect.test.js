import requestManager, { createQuery } from '../Services/TwitchConnect';

describe('request manager tests', () => {
  it('should for the url correctly', () => {
    const expected = '/api/search?term=foo&limit=10';
    expect(createQuery('foo', 10)).toEqual(expected);
  });

  it('should return an empty result invalid query is sent', () => {
    requestManager(undefined, 10).then(response => {
      expect(response).toEqual({ streams: [] });
    });
  });
});

describe('integration tests - requires server to be running', () => {
  it('should return valid JSON when a search request is made', () => {
    requestManager('example', 10).then(response => {
      expect(typeof response).toEqual('object');
      console.log(response);
    });
  });
});
