import angular from 'angular';
import {companyComponent} from './company.component';

export const company = angular.module('company', [])
  .config(config)
  .component('company', companyComponent);

function config($stateProvider) {
  $stateProvider.state('company', {
    url: '/company',
    template: '<company></company>'
  });
}

config.$inject = ['$stateProvider'];