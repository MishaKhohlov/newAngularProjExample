import angular from 'angular';
import {workComponent} from './work.component';

export const work = angular.module('work', [])
  .config(config)
  .component('work', workComponent);

function config($stateProvider) {
  $stateProvider.state('work', {
    url: '/works',
    template: '<work></work>'
  });
}

config.$inject = ['$stateProvider'];