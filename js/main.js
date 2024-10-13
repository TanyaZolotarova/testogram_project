import {generatePhotosArray} from './photoGenerator.js';
import {renderPhoto} from './photoRender.js'
import {showBigPicture} from './fullPhotoView.js';
import {openForm} from "./formValidation.js";
import {initScaleControl} from "./scaleControls.js";
import {initEffectsControl} from "./effectsControl.js";


const photosArray = generatePhotosArray(25);
renderPhoto(photosArray);

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', (evt) => {
  const pictureEl = evt.target.closest('.picture');
  if (pictureEl) {
    const pictureId = pictureEl.dataset.id;
    const selectedPhoto = photosArray.find(photo => photo.id === Number(pictureId));
    showBigPicture(selectedPhoto);
  }
});

const fileInput = document.querySelector('#upload-file');

fileInput.addEventListener('change', () => {
  openForm();
  initScaleControl();
  initEffectsControl();
});
