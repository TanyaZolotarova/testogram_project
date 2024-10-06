import {toggleSliderVisibility} from './effectsControl.js';
import {isScaleControlInitialized} from './scaleControls.js'

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const fileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeBtn = document.querySelector('#upload-cancel');
export const scaleValueInput = document.querySelector('.scale__control--value');
export const imagePreview = document.querySelector('.img-upload__preview img');

const maxHashtag = 5;
const maxHashtagLength = 20;
const maxCommentLength = 140;
const hashtagRegex = /^#[a-zA-Z0-9]{1,19}$/;
const errorMessages = {
  maxHashtags: `Нельзя указать больше ${maxHashtag} хештегов`,
  hashtagStart: 'Хештег должен начинаться с символа #',
  hashtagInvalid: 'Хештег должен состоять из букв и чисел, без спецсимволов, максимум 20 символов',
  hashtagDuplicate: 'Хештеги не должны повторяться',
  maxHashtagLength: `Хештег не может превышать ${maxHashtagLength} символов`,
  commentLength: `Комментарий не может быть длиннее ${maxCommentLength} символов`
};

export function openForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  toggleSliderVisibility(selectedEffect);
}

function closeForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  fileInput.value = '';
  hashtagsInput.setCustomValidity('');
  descriptionInput.setCustomValidity('');
  imagePreview.className = '';
  imagePreview.style.filter = '';
  scaleValueInput.value = '100%';
  imagePreview.style.transform = 'scale(1)';

  isScaleControlInitialized = false;

  document.querySelector('#effect-none').checked = true;
}

closeBtn.addEventListener('click', closeForm);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.activeElement !== hashtagsInput && document.activeElement !== descriptionInput) {
    closeForm();
  }
});

function validateHashtags(e) {
  const hashtagsValue = hashtagsInput.value.trim();
  const hashtagsArray = hashtagsValue.split(' ').filter(Boolean);
  const uniqueHashtags = new Set();

  hashtagsInput.setCustomValidity('');

  if (hashtagsArray.length > maxHashtag) {
    hashtagsInput.setCustomValidity(errorMessages.maxHashtags);
    e.preventDefault();
  } else {
    hashtagsArray.forEach((hashtag) => {
      if (hashtag.length < 2) {
        hashtagsInput.setCustomValidity(errorMessages.hashtagStart);
        e.preventDefault();
      } else if (!hashtagRegex.test(hashtag)) {
        hashtagsInput.setCustomValidity(errorMessages.hashtagInvalid);
        e.preventDefault();
      } else if (uniqueHashtags.has(hashtag.toLowerCase())) {
        hashtagsInput.setCustomValidity(errorMessages.hashtagDuplicate);
        e.preventDefault();
      } else if (hashtag.length > maxHashtagLength) {
        hashtagsInput.setCustomValidity(errorMessages.maxHashtagLength);
        e.preventDefault();
      } else {
        uniqueHashtags.add(hashtag.toLowerCase());
      }
    });
  }

  hashtagsInput.reportValidity();
}

function validateDescription() {
  const descriptionValue = descriptionInput.value.trim();
  if (descriptionValue.length > maxCommentLength) {
    descriptionInput.setCustomValidity(errorMessages.commentLength);
  } else {
    descriptionInput.setCustomValidity('');
  }
}

form.addEventListener('submit', (e) => {
  validateHashtags(e);
  validateDescription();
});

hashtagsInput.addEventListener('input', validateHashtags);
descriptionInput.addEventListener('input', validateDescription);
