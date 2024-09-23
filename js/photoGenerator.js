import {getRandomEl, getRandomNumber} from "./util.js";
import {photoDescription, userComments, userNames} from "./mockData.js";

function getRandomAvatar() {
  return `img/avatar-${getRandomNumber(1, 6)}.svg`;
}

function generateComment(id) {
  return {
    id,
    avatar: getRandomAvatar(),
    message: getRandomEl(userComments),
    name: getRandomEl(userNames)
  };
}

function generateComments() {
  return new Array(getRandomNumber(0, 5))
    .fill(null)
    .map(() => generateComment(getRandomNumber(1, 500)));
}

export function generatePhotoObject(id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomEl(photoDescription),
    likes: getRandomNumber(1, 500),
    comments: generateComments()
  };
}

export function generatePhotosArray(numberOfPhotos) {
  return new Array(numberOfPhotos)
    .fill(null)
    .map((_, index) => generatePhotoObject(index + 1));
}
