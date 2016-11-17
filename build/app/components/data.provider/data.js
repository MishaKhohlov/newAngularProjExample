import angular from 'angular';
import {dataAppFunc} from './data.provider';
import {authorizationFactory} from './auth.factory';
import {fileUpload} from './filesUpload.directive';
import {filterPublick} from './filterPublick.filer';
import {initSocial} from './initSocial.factory';
import {parallax} from './parallax.directive';

export const dataProvider = angular.module('dataProvider', [])
  .run(run)
  .provider('dataApp', dataAppFunc)
  .directive('ngFiles', fileUpload)
  .directive('parallax', parallax)
  .factory('authFact', authorizationFactory)
  .factory('initSocial', initSocial)
  .filter('publicStatus', filterPublick);

function run(dataApp, $http, $q) {
  let DataConfig = {};
  const prom = $q.defer();

  let hard = {
    ourPhoto: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8'],
    employees: {
      elena: {
        name: 'Elena',
        position: 'Illustrator',
        img: 'teamРuman1',
        link: './test-link-com'
      },
      margaryta: {
        name: 'Margaryta',
        position: 'Business Development Manager',
        img: 'teamРuman2',
        link: './test-link-com'
      },
      yaroslav: {
        name: 'Yaroslav',
        position: 'Front-end developer',
        img: 'teamРuman3',
        link: './test-link-com'
      },
      veronika: {
        name: 'Veronika',
        position: 'HR manager',
        img: 'teamРuman4',
        link: './test-link-com'
      },
      margaryta2: {
        name: 'Margaryta1',
        position: 'Business Development Manager',
        img: 'teamРuman2',
        link: './test-link-com'
      },
      yaroslav3: {
        name: 'Yaroslav2',
        position: 'Front-end developer',
        img: 'teamРuman3',
        link: './test-link-com'
      },
      elena1: {
        name: 'Elena3',
        position: 'Illustrator',
        img: 'teamРuman1',
        link: './test-link-com'
      },
      veronika4: {
        name: 'Veronika4',
        position: 'HR manager',
        img: 'teamРuman4',
        link: './test-link-com'
      }
    },
    reviews: {
      bca0: {
        title: 'bca 1',
        img: 'slider-cap',
        description: `Excellent response time and grasp of PHP/Mysql/Flex. Many small requests for
              programming are done quickly and with little guidance. Finding bugs and making code tweaks is difficult,
              but SynapseCo has always come through with the code. Good work!`,
        human: 'Baris Turkoglu',
        position: 'IT Manager',
        company: 'BCA Sweden*'
      },
      bca2: {
        title: 'bca 2',
        img: 'slider-cap',
        description: `Excellent response time and grasp of PHP/Mysql/Flex.Finding bugs and making code tweaks is difficult,
              but SynapseCo has always come through with the code. Good work!`,
        human: 'Baris Turkoglu',
        position: 'IT Manager',
        company: 'BCA Sweden*'
      },
      bca3: {
        title: 'bca 3',
        img: 'slider-cap',
        description: `Excellent response time and grasp of PHP/Mysql/Flex. Good work!`,
        human: 'Baris Turkoglu',
        position: 'IT Manager',
        company: 'BCA Sweden*'
      }
    }
  };

  const standartUrl = 'http://test/back';

  const conf = {
    method: 'GET',
    url: standartUrl + '/admin/data/getall',
  };

  $http(conf).then((request) => {
    console.log('All Data', request.data);
    DataConfig = request.data;

    let temporaryDataConfig = Object.assign({}, DataConfig, hard);

    prom.resolve(temporaryDataConfig);
  }, (error) => {
    console.log('Error get global data', error);
  });

  dataApp.setData(prom.promise);

}

run.$inject = ['dataApp', '$http', '$q'];
