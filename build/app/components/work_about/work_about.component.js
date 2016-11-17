import {WorkAboutController as controller} from './work_about.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './work_about.html';

let workAboutComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'workAb'
};

preloadPage.addRequest(url, workAboutComponent);

export{workAboutComponent}