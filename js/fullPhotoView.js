const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = document.querySelector('#picture-cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCountBlock = document.querySelector('.social__comment-count');
const loadMoreButton = document.querySelector('.comments-loader');
const body = document.body;

let currentComments = 0;
let commentsToShow = [];
const commentsBlockSize = 5;

function closeBigPhoto() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCountBlock.classList.add('hidden');
  loadMoreButton.classList.add('hidden');
  removeEventListeners();
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPhoto();
  }
}

export function showBigPicture(photoData) {
  setBigPictureData(photoData);
  renderComments();

  toggleLoadMoreButton();
  addEventListeners();
}

function setBigPictureData(photoData) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length.toString();
  socialCaption.textContent = photoData.description;

  socialComments.innerHTML = '';
  currentComments = 0;
  commentsToShow = photoData.comments;
}

function renderComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = commentsToShow.slice(currentComments, currentComments + commentsBlockSize);

  nextComments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
  currentComments += nextComments.length;

  updateCommentCount();
  toggleLoadMoreButton();
}

function createCommentElement(comment) {
  const commentEl = document.createElement('li');
  commentEl.classList.add('social__comment');
  commentEl.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentEl;
}

function updateCommentCount() {
  if (commentsToShow.length === 0) {
    commentCountBlock.classList.add('hidden');
  } else {
    const displayedComments = Math.min(currentComments, commentsToShow.length);
    commentCountBlock.textContent = `${displayedComments} из ${commentsToShow.length} комментариев`;
    commentCountBlock.classList.remove('hidden');
  }
}

function toggleLoadMoreButton() {
  if (currentComments >= commentsToShow.length) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
}

function addEventListeners() {
  closeButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onEscPress);
  loadMoreButton.addEventListener('click', renderComments);
}

function removeEventListeners() {
  closeButton.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', onEscPress);
  loadMoreButton.removeEventListener('click', renderComments);
}
