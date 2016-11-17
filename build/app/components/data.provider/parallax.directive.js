import $ from 'jquery';

export const parallax = () => {
  return {
    restrict: 'A',
    link
  }
};

function link(scope, element) {
  let posEl, posElEnd;
  let imgParallax = $('.jsParalax__bgImg');
  let windowHeight = $(window).height();
  let headerHeight = $('.pageHeader').height();
  let parallaxWrapper = $('.jsParalax');
  let speed = 3;

  setTimeout(() => {
    if(parallaxWrapper) {
      posEl = parallaxWrapper.offset().top;
      posElEnd = posEl + parallaxWrapper.height() + windowHeight - headerHeight;
    }
  }, 1000);

  $(window).scroll(() => {
    const scroolY = $(window).scrollTop() + windowHeight;
    const calcScroll = scroolY - posEl;

    if(scroolY >= posEl && scroolY <= posElEnd) {
      imgParallax.css({
        'transform': 'translate(0, -' + ~~(calcScroll / speed) + 'px)'
      });
    }
  });
}

link.$inject = ['$scope', '$element'];
