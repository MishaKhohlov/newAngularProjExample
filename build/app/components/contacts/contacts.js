import angular from 'angular';
import {contactsComponent} from './contacts.component';

export const contacts = angular.module('contacts', [])
  .config(config)
  .component('contacts', contactsComponent);

function config($stateProvider) {
  $stateProvider.state('contacts', {
    url: '/contacts',
    template: '<contacts></contacts>'
  });
}

config.$inject = ['$stateProvider'];