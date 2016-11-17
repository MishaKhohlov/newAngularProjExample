import {servicesController as controller} from './services.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './services.html';

let servicesComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'srvc'
};

preloadPage.addRequest(url, servicesComponent);

export {servicesComponent}