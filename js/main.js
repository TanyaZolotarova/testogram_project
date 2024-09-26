import {generatePhotosArray} from './photoGenerator.js';
import {renderPhoto} from './photoRender.js'
import {showBigPicture} from './fullPhotoView.js';

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
