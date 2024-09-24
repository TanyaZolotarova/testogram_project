export function generatePhoto(photoData) {
  const template = document.querySelector('#picture').content.cloneNode(true);
  const imgEl = template.querySelector('.picture__img');
  imgEl.src = photoData.url;
  const likesEl = template.querySelector('.picture__likes');
  likesEl.textContent = photoData.likes;
  const commentsEl = template.querySelector('.picture__comments');
  commentsEl.textContent = photoData.comments.length;

  return template;
}

export function renderPhoto(photosArray) {
  const fragment = document.createDocumentFragment();

  photosArray.forEach(photo => {
    const img = generatePhoto(photo);
    fragment.appendChild(img);
  });

  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.appendChild(fragment);
}
