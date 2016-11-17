import {ContactsController as controller} from './contacts.controller';
import {preloadPage} from '../preloadPage/preloadPage'

const url = './contacts.html';

let contactsComponent = {
  templateUrl: url,
  controller,
  controllerAs: 'cont'
};

preloadPage.addRequest(url, contactsComponent);

export{contactsComponent}