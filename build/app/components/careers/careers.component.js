import { CareersController as controller } from './careers.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './careers.html';

const careersComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'careers'
};

preloadPage.addRequest(url, careersComponent);

export {careersComponent}