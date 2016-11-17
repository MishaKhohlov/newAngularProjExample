import angular from 'angular';
import {adminEditComponent} from './admin_edit.component';

export const admin_edit = angular.module('admin_edit', [])
  .config(config)
  .component('adminedit', adminEditComponent);


function config($stateProvider) {
  $stateProvider.state('edit', {
      url: '/admin/edit?currentState',
      template: '<adminedit></adminedit>'
      // resolve: {
      //   promiseObj: ['authFact', (authFact) => {
      //     return authFact.auth();
      //   }]
      // }
    });
}

config.$inject = ['$stateProvider'];