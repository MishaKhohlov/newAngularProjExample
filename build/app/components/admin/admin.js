import angular from 'angular';
import {adminComponent} from './admin.component';

export const admin = angular.module('admin', [])
  .config(config)
  .component('admin', adminComponent);

function config($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    template: '<admin></admin>'
  })
}

config.$inject = ['$stateProvider'];