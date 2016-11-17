import angular from 'angular';
import { careersComponent } from './careers.component';

export const careers = angular.module('careers', [])
.config(config)
.component('careers', careersComponent);

function config($stateProvider) {
  $stateProvider.state('careers', {
    url: '/careers',
    template: '<careers></careers>'
  });
}
config.$inject = ['$stateProvider'];
