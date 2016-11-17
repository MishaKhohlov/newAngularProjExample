import angular from 'angular';
import {callBackFormComponent} from './call_back_form.component';

export const call_back_form = angular.module('call_back_form', [])
  .config(config)
  .component('callbackform', callBackFormComponent);

function config($stateProvider) {
  $stateProvider.state('call_back_form', {
    url: '/call_back_form/:direction',
    template: '<callbackform></callbackform>'
  });
}

config.$inject = ['$stateProvider'];