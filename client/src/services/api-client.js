const SERVER_URL = 'http://localhost:3333/api/v1/pics/';

export async function getPictures(page) {
  return fetch(`${SERVER_URL}${page}`).then(raw => raw.json());
}


export default {
  getPictures
}