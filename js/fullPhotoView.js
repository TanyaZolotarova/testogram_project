const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = document.querySelector('#picture-cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const body = document.body;

function closeBigPhoto() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPhoto();
  }
}

export function showBigPicture(photoData) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length.toString();
  socialCaption.textContent = photoData.description;

  socialComments.innerHTML = '';
  photoData.comments.forEach(comment => {
    const commentEl = document.createElement('li');
    commentEl.classList.add('social__comment');
    commentEl.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
    socialComments.appendChild(commentEl);
  });

  document.querySelector('.social__comment-count').classList.add('hidden');
  closeButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onEscPress);
}
