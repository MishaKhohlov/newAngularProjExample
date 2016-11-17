class CareersController {
  // $translate
  constructor($scope, dataApp, $filter) {
    // this.$translate = $translate;
    this.$scope = $scope;

    dataApp.globalPromise().then(() => {
      this.dataVacancies = $filter('publicStatus')(dataApp.getData('vacancies'));
    });
  }

  $onInit() {

  }
}
//  '$translate',
CareersController.$inject = ['$scope', 'dataApp', '$filter'];

export { CareersController };
