import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_HpJ6YykPqNOFIGCJ4BNkfnMENBzwukXlBlKxGvkIolA56WttNxwtL82WRYdt6ECF';

const BASE_URL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}breeds`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!'
      );
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!'
      );
      throw error;
    });
}
