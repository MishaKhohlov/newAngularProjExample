import angular from 'angular';
import {workAboutComponent} from './work_about.component';
import {scrollNavigation} from './scrollNav.directive';

export const work_about = angular.module('work_about', [])
  .config(config)
  .directive('scrollNav', scrollNavigation)
  .component('workabout', workAboutComponent);


function config($stateProvider) {
  $stateProvider.state('work_about', {
    url: '/works/:key',
    template: '<workabout></workabout>'
  });
}

config.$inject = ['$stateProvider'];