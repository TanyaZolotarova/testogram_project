const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const fileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeBtn = document.querySelector('#upload-cancel');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');

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
const scaleStep = 25;
const minScale = 25;
const maxScale = 100;

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

function updateScale(newScale) {
  scaleValueInput.value = `${newScale}%`;
  imagePreview.style.transform = `scale(${newScale / 100})`;
}

scaleSmallerButton.addEventListener('click', () => {
  let currentScale = parseInt(scaleValueInput.value, 10);
  if (currentScale > minScale) {
    currentScale -= scaleStep;
    updateScale(currentScale);
  }
});
scaleBiggerButton.addEventListener('click', () => {
  let currentScale = parseInt(scaleValueInput.value, 10);
  if (currentScale < maxScale) {
    currentScale += scaleStep;
    updateScale(currentScale);
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function updateEffect(intensity) {
  const effect = document.querySelector('.effects__radio:checked').value;
  switch (effect) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${intensity / 100})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${intensity / 100})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${(intensity * 3) / 100}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${1 + (intensity * 2) / 100})`;
      break;
    default:
      imagePreview.style.filter = '';
      break;
  }
}

function toggleSliderVisibility(effect) {
  if (effect === 'none') {
    effectLevelFieldset.classList.add('hidden');
    sliderElement.setAttribute('disabled', '');
  } else {
    effectLevelFieldset.classList.remove('hidden');
    sliderElement.removeAttribute('disabled');
  }
}

sliderElement.noUiSlider.on('update', (values, handle) => {
  const intensity = values[handle];
  effectValue.value = intensity;
  updateEffect(intensity);
});

effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const effect = radio.value;

    imagePreview.className = '';
    imagePreview.style.filter = '';

    toggleSliderVisibility(effect);

    if (effect !== 'none') {
      sliderElement.noUiSlider.set(100);
      updateEffect(100);
    }

    imagePreview.classList.add(`effects__preview--${effect}`);
  });
});
form.addEventListener('submit', (e) => {
  validateHashtags(e);
  validateDescription();
});

hashtagsInput.addEventListener('input', validateHashtags);
descriptionInput.addEventListener('input', validateDescription);
