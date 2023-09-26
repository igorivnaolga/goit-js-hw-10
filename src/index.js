import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const select = document.querySelector('.breed-select');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loaderMessage.hidden = false;
select.hidden = true;

function markup(arr) {
  return arr
    .map(({ name, id }) => {
      return `<option class="js-selectOption" value="${id}">${name}</option>`;
    })
    .join('');
}
