import angular from 'angular';
import {blogComponent} from './blog.component';
import {filterCategories} from './filter_categories.filter';

export const blog = angular.module('blog', [])
  .config(config)
  .component('blog', blogComponent)
  .filter('categories', filterCategories);

function config($stateProvider) {
  $stateProvider.state('blog', {
    url: '/blog',
    template: '<blog></blog>'
  })
}

config.$inject = ['$stateProvider'];