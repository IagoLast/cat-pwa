export async function getPictures(page) {
  return fetch(`http://localhost:3000/api/v1/pics/${page}`).then(raw => raw.json());
}


export default {
  getPictures
}