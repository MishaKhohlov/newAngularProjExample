import angular from 'angular';
import {vacancyDescriptionComponent} from './vacancy_description.component';

export const vacancy_description = angular.module('vacancyDescription', [])
  .config(config)
  .component('vacancydescription', vacancyDescriptionComponent);

function config($stateProvider) {
  $stateProvider.state('vacancy_description', {
    url: '/careers/vacancy_description/:vacancy',
    template: '<vacancydescription></vacancydescription>'
  });
}

config.$inject = ['$stateProvider'];