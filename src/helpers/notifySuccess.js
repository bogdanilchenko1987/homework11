import { Notify } from 'notiflix/build/notiflix-notify-aio';

function notifySuccess() {
  Notify.success('Choose a cat breed', {
    position: 'center-top',
    timeout: 1500,
  });
}

export { notifySuccess };
