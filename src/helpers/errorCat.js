import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

function errorCat() {
  refs.loader.hidden = true;
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-top',
    timeout: 1500,
  });
  refs.catSelect.hidden = true;
}

export { errorCat };
