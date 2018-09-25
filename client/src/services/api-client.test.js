import apiClient from './api-client';

it('Makes a request to the right url', async () => {
  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => [],
  }));

  const actual = await apiClient.getPictures();
  expect(actual).toEqual([]);
});