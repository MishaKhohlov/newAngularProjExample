import $ from 'jquery';

export const stepsAnimation = () => {
  return {
    restrict: 'A',
    link
  }
};

function link(scope, element) {
  let posEl;
  let windowHeight = $(window).height();
  let headerHeight = $('.pageHeader').height();
  let animationWrapper = $('.oneStepHolder__wrapBox');
  let animationTime = 0;

  setTimeout(() => {
    if(animationWrapper) {
      posEl = animationWrapper.offset().top + windowHeight;
    }
  }, 1000);

  const eventScroll = $(window).bind('scroll',() => {
    const scroolY = $(window).scrollTop() + windowHeight + headerHeight;

    if(scroolY >= posEl) {
      eventScroll.unbind('scroll');

      $('.stepsIcons__item').each(function () {
        let thisItem = $(this);
        setTimeout(() => {
          thisItem.addClass('stepAnimate');
        }, animationTime);
        animationTime += 250;
      });
    }
  });
}

link.$inject = ['$scope', '$element'];
