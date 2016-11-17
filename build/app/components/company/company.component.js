import {CompanyController as controller} from './company.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './company.html';

let companyComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'comp'
};

preloadPage.addRequest(url, companyComponent);

export{companyComponent}