import {BlogController as controller} from './blog.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './blog.html';

let blogComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'blog'
};

preloadPage.addRequest(url, blogComponent);

export{blogComponent}