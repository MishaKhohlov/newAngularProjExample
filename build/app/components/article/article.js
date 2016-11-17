import angular from 'angular';
import {articleComponent} from './article.component';

export const article = angular.module('article', [])
  .config(config)
  .component('artcl', articleComponent);

function config($stateProvider) {
  $stateProvider.state('article', {
    url: '/blog/article/:id',
    template: '<artcl></artcl>'
  });
}

config.$inject = ['$stateProvider'];