import { WorkController as controller } from './work.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './work.html';

const workComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'work'
};

preloadPage.addRequest(url, workComponent);

export {workComponent};