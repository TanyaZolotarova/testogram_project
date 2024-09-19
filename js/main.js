const userNames = ['Harry', 'Hermione', 'Ron', 'Draco', 'Luna', 'Neville', 'Ginny', 'Severus',
  'Albus', 'Sirius', 'Bellatrix', 'Hagrid', 'Fred', 'George', 'Dobby', 'Fleur', 'Cho', 'Cedric'];

const userComments = ['Все відмінно!', 'Загалом все непогано. Але не всі.',
  'Коли ви робите фотографію, добре б прибирати палець із кадру.', 'Зрештою, це просто непрофесійно.',
  'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
  'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
  'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCommentText() {
  return userComments[getRandomNumber(0, userComments.length - 1)];
}

function getRandomUserName() {
  return userNames[getRandomNumber(0, userNames.length - 1)];
}

function getRandomAvatar() {
  return `img/avatar-${getRandomNumber(1, 6)}.svg`;
}

function generateComment(id) {
  return {
    id,
    avatar: getRandomAvatar(),
    message: getRandomCommentText(),
    name: getRandomUserName()
  };
}

function generateComments() {
  return new Array(getRandomNumber(0, 5))
    .fill(null)
    .map(() => generateComment(getRandomNumber(1, 500)));
}

function generatePhotoObject(id) {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: `Мій допис до фотографії #${id}`,
    likes: getRandomNumber(1, 500),
    comments: generateComments()
  };
}

function generatePhotosArray(numberOfPhotos) {
  return new Array(numberOfPhotos)
    .fill(null)
    .map((_, index) => generatePhotoObject(index + 1));
}

console.log('Show photos ------------ ==', generatePhotosArray(25));
