import {imagePreview, scaleValueInput} from "./formValidation.js";

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');

const scaleStep = 25;
const minScale = 25;
const maxScale = 100;

function updateScale(newScale) {
  scaleValueInput.value = `${newScale}%`;
  imagePreview.style.transform = `scale(${newScale / 100})`;
}

function handleScaleBtnChange({btn, step, min, max}) {
  const scaleHandler = () => {
    let currentScale = parseInt(scaleValueInput.value, 10);
    const newScale = currentScale + step;

    if (newScale >= min && newScale <= max) {
      updateScale(newScale);
    }
  }
  btn.removeEventListener('click', scaleHandler);

  btn.addEventListener('click', scaleHandler);
}

export let isScaleControlInitialized = false;

export function initScaleControl() {
  if (isScaleControlInitialized) return;
  handleScaleBtnChange({
    btn: scaleSmallerButton,
    step: -scaleStep,
    min: minScale,
    max: maxScale
  });

  handleScaleBtnChange({
    btn: scaleBiggerButton,
    step: scaleStep,
    min: minScale,
    max: maxScale
  });

  isScaleControlInitialized = true;
}
