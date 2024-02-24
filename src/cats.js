import './css/common.css';

import { createMarkupDiv } from './helpers/createMarkupDiv';
import { createMarkupSelect } from './helpers/createMarkupSelect';
import { notifySuccess } from './helpers/notifySuccess';
import { errorByBreed } from './helpers/errorByBreed';
import { errorCat } from './helpers/errorCat';
import { fetchBreeds, fetchCatByBreed } from './components/cat-api';
import { refs } from './helpers/refs';

refs.loader.hidden = false;

fetchBreeds()
  .then(data => {
    refs.loader.hidden = true;
    refs.catSelect.hidden = false;
    refs.catSelect.insertAdjacentHTML(
      'beforeend',
      createMarkupSelect(data.data)
    );
  })
  .catch(errorCat);

refs.catSelect.addEventListener('input', onSelect);

function onSelect(e) {
  const currentCatId = e.currentTarget.value;
  if (currentCatId !== 'choose') {
    refs.loader.hidden = false;
    refs.catDiv.innerHTML = '';

    fetchCatByBreed(currentCatId)
      .then(data => {
        if (currentCatId === data.id) {
          refs.catDiv.innerHTML = createMarkupDiv(data);
        }
        refs.loader.hidden = true;
      })
      .catch(errorByBreed);
  } else {
    notifySuccess();
  }
}
