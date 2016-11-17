export const settingLanguage = angular.module('settingLanguage', [])
  .factory('customStorage', customStorage)
  .factory('asyncLoader', asyncLoader);

function asyncLoader($q, $http) {
  return function (options) {
    const lang = {
      en: './language/languageEn.json',
      fr: './language/languageFr.json'
    };
    let langFrCash= $http({
      method: 'GET',
      url: lang.fr
    });
    
    let deferred = $q.defer();

    if (options.key === 'en') {
      $http({
        method: 'GET',
        url: lang.en
      }).then((response) => {
        deferred.resolve(response.data);
      }, (error) => {
        console.log('Error get language data', error);
      });
    } else {
      langFrCash.then((response) => {
        deferred.resolve(response.data);
      }, (error) => {
        console.log('Error get language data', error);
      });
    }

    return deferred.promise;
  }
}

function customStorage() {
  return {
    put: function (name, value) {
      localStorage.setItem(name, value);
    },
    get: function (name) {
      return localStorage.getItem(name);
    }
  };
}

asyncLoader.$inject = ['$q', '$http'];