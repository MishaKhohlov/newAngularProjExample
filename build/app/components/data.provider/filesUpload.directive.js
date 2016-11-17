export const fileUpload = () => {
  return {
    scope: {
      fileArea: '=',
      fileAreaName: '='
    },
    restrict: 'A',
    controller
  }
};

function controller(scope, element) {
  element.on('change', function (event) {
    scope.$apply(() => {
      scope.fileAreaName = 'Attached ' + event.target.files[0].name;
      scope.fileArea = event.target.files[0];
    });
  });
}

controller.$inject = ['$scope', '$element'];