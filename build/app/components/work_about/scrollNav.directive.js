import $ from 'jquery';

const scrollNavigation = () => {
  return {
    restrict: 'A',
    scope: {
      active: '=',
      menu: '='
    },
    controller
  };
};


function controller(scope, element) {
  let body = $('html, body'),
    headerHeight = $('.headerMenu').height(),
    menu = $('.aboutWorkSubMenuBox'),
    workMenuHeight = menu.height(),
    menuOffset = menu[0].offsetTop;

  let objElemPosition = {
    challenge: searchHeight('challengSection'),
    process: searchHeight('processSection'),
    result: searchHeight('resultSection')
  };

  function searchHeight(className) {
    return $('.' + className)[0].offsetTop
  }

  function scrollToElem(data) {
    body.animate({
      scrollTop: objElemPosition[data] - (headerHeight + workMenuHeight)
    }, 1000);
  }

  $(element).on('click', '.aboutWorkSubMenu__item', (ev) => {
    let data = $(ev.currentTarget).data('name');
    scope.$apply(scope.active = data);
    scrollToElem(data);
  });

  $(window).scroll(() => {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollTop += headerHeight;

    if (scrollTop >= menuOffset) {
      scope.$apply(scope.menu = true);
    } else {
      scope.$apply(scope.menu = false);
    }
    scrollTop += workMenuHeight + 100;

    if (scrollTop < objElemPosition.challenge) {
      scope.$apply(scope.active = '');
    } else if (scrollTop >= objElemPosition.result) {
      scope.$apply(scope.active = 'result');
    } else if (scrollTop >= objElemPosition.process) {
      scope.$apply(scope.active = 'process');
    } else if (scrollTop >= objElemPosition.challenge) {
      scope.$apply(scope.active = 'challenge');
    }
  });
}


controller.$inject = ['$scope', '$element'];
scrollNavigation.$inject = [];

export {scrollNavigation};
