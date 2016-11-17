import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
// import translate from 'angular-translate';
import {appComponent} from './app.component';
import {slickCarousel} from './components/angular-slick/angular-slick';
// import {settingLanguage} from './language/settingLanguage.factory';

import {preloadPage} from './components/preloadPage/preloadPage'

import {components} from './components/components';

// translate,
// settingLanguage.name
angular.module('app', [
  uiRouter,
  ngAnimate,
  slickCarousel.name,
  components.name
])
  .config(config)
  .constant('url', 'http://test')
  .constant('urlBlog', 'http://test')
  .constant('tech', technologies())
  .run(runBlock)
  .component('app', appComponent);

// $translateProvider
function config($urlRouterProvider) {
  // $translateProvider.preferredLanguage('en');
  // $translateProvider.fallbackLanguage('en');
  // $translateProvider.useLoader('asyncLoader');
  // $translateProvider.useSanitizeValueStrategy('escape');
  // $translateProvider.useStorage('customStorage');

  $urlRouterProvider.otherwise('/');
}

function runBlock($rootScope) {
  $rootScope.$on('$locationChangeStart', function(...arg) {
    let hash = '.' + arg[1].split('#')[1] + '.html';
    preloadPage.abort(hash);
    window.scrollTo(0, 0);
  });

  $rootScope.$on('$stateChangeError', (...arg) => {
    throw arg[5] + ' - section resolve get another data'
  })
}

function technologies() {
  return ['html', 'css', 'js', 'node',
    'backbone', 'angular', 'jQuery',
    'bootstrap', 'dotNet', 'php',
    'wordpress', 'prestashop', 'opencart',
    'shopify', 'ios', 'xcode', 'objC',
    'swift', 'android', 'java', 'someCup',
    'xamarin', 'phoneGap', 'marmalade',
    'cocos20x', 'coronaLabs', 'unity',
    'unrealEngine', 'visualStudio',
    'someCup2', 'cSharp', 'c++']
}

runBlock.$inject = ['$rootScope'];
// '$translateProvider'
config.$inject = ['$urlRouterProvider'];