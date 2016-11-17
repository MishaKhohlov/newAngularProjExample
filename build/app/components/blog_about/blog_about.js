import angular from 'angular';
import {blogAboutComponent} from './blog_about.component';

export const blog_about = angular.module('blog_about', [])
  .config(config)
  .component('blogabout', blogAboutComponent);

function config($stateProvider) {
  $stateProvider.state('blog.blog_about', {
    url: '/article/:key',
    template: `<blogabout class="blogPageWrapBox"
                          article="blog.article"
                          url="blog.url"
                          share="blog.shareBlog"
                          context="blog"
                          blogs="blog.blogs"></blogabout>`
  });
}

config.$inject = ['$stateProvider'];