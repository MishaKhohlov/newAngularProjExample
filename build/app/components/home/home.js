import angular from 'angular';
import {homeComponent} from './home.component';
import {stepsAnimation} from './stepsAnimation.directive';

export const home = angular.module('home', [])
  .config(config)
  .directive('stepsAnimation', stepsAnimation)
  .component('home', homeComponent);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
  /*$locationProvider.html5Mode({
   enabled: true,
   requireBase: false
   });*/
  $stateProvider.state('home', {
    url: '/',
    template: '<home></home>'
  });
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
