import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectPlaceholder = `<option class="js-selectOption js-placeholder-select" value="choose">Select the cat</option>`;

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

select.insertAdjacentHTML('afterbegin', selectPlaceholder);

loaderMessage.hidden = false;
select.hidden = true;
errorMessage.style.display = 'none';

function markup(arr) {
  return arr
    .map(({ name, id }) => {
      return `<option class="js-selectOption" value="${id}">${name}</option>`;
    })
    .join('');
}

fetchBreeds()
  .then(data => {
    select.insertAdjacentHTML('beforeend', markup(data));
    loaderMessage.hidden = true;
    select.hidden = false;
    new SlimSelect({
      select: '.breed-select',
    });
  })

  .catch(err => console.log(err));

select.addEventListener('change', onChangeSelect);

function onChangeSelect() {
  catInfo.classList.add('cat-card');
  errorMessage.hidden = true;
  loaderMessage.hidden = false;
  select.hidden = true;

  fetchCatByBreed(select.value)
    .then(data => {
      const img = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      catInfo.innerHTML = createCatCard(img, name, description, temperament);
      loaderMessage.hidden = true;
      select.hidden = false;
      catInfo.classList.remove('cat-card');
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!'
      );

      loaderMessage.hidden = true;
      select.hidden = false;
      console.log(err);
      catInfo.classList.add('cat-card');
    });
}

function createCatCard(img, name, description, temperament) {
  return `<img class="js-cat-photo" src="${img}" alt="${name}" width="300">
    <div class="js-cat-description">
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p>
    </div>`;
}
