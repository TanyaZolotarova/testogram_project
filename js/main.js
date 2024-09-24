import {generatePhotosArray} from './photoGenerator.js';
import {renderPhoto} from './photoRender.js'

const photosArray = generatePhotosArray(25);
renderPhoto(photosArray);
