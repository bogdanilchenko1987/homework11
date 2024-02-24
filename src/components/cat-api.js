import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_0XRpC8Po01PXAQJmKptYMksyFdVeOuaR6d7U8pG03zd8V4rFBYCgYiOSFgFVRDWF';

async function fetchBreeds() {
  const resp = await axios.get(`${BASE_URL}/breeds`);

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp;
}

async function fetchCatByBreed(breedId) {
  const resp = await axios.get(`${BASE_URL}/images/${breedId}`);

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  return resp.data;
}

export { fetchBreeds, fetchCatByBreed };
