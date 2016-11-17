import angular from 'angular';
import {editSectionComponent} from './edit_section.component';

export const edit_section = angular.module('edit_section', [])
  .config(config)
  .component('editsection', editSectionComponent);

function config($stateProvider) {
  $stateProvider.state('edit_section', {
    url: '/admin/edit/:section/:key',
    template: '<editsection></editsection>',
    // resolve: {
    //   promiseObj: ['authFact', (authFact) => {
    //     return authFact.auth();
    //   }]
    // }
  });
}

config.$inject = ['$stateProvider'];