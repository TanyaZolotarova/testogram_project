import {imagePreview} from "./formValidation.js";

const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  tooltips: true,
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

export function toggleSliderVisibility(effect) {
  if (effect === 'none') {
    effectLevelFieldset.classList.add('hidden');
    sliderElement.setAttribute('disabled', '');
  } else {
    effectLevelFieldset.classList.remove('hidden');
    sliderElement.removeAttribute('disabled');
  }
}

export function initEffectsControl() {
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
}
