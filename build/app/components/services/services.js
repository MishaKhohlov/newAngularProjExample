import angular from 'angular';
import {servicesComponent} from './services.component';

export const services = angular.module('services', [])
  .config(config)
  .component('services', servicesComponent);

function config($stateProvider) {
  $stateProvider.state('services', {
    url: '/services',
    template: '<services></services>'
  });
}

config.$inject = ['$stateProvider'];