import {BlogAboutController as controller} from './blog_about.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './blog_about.html';

let blogAboutComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'blogAb',
  bindings: {
    article: '<',
    url: '<',
    blogs: '<',
    context: '=',
    share: '<'
  },
};

preloadPage.addRequest(url, blogAboutComponent);

export{blogAboutComponent}