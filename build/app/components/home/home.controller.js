class HomeController {
  constructor(dataApp, url, $state, $filter, $scope) {
    this.$state = $state;
    this.url = url;
    this.$scope = $scope;

    this.listStrategy = [
      {title: 'Strategy Planning', className: 'doMoreListItem-strategy', description: `The best developers can elevate a project from merely skillful to exquisite
        artistry. Our team of specialists not only has a strong foundation in programming but also has the vision and
        drive to create innovative.`},
      {title: 'Vision Design', className: 'doMoreListItem-vision', description: `Understanding is the foundation of success, and we know that understanding comes
        from focused client conversations and collaboration. Our team is committed to direct, open contact with our
        clients every step of.`},
      {title: 'Development QA', className: 'doMoreListItem-develop', description: `Innovation stems from ideas, ideas inspired by a new perspective. Our goal is to
        serve our client’s vision while bringing fresh concepts and creative thinking to the table. KnubiSoft serves up
        imagination with collaboration.`},
      {title: 'Deployment Optimization', className: 'doMoreListItem-deployment', description: `In architecture, a solid building foundation is as important as the finished
        design, and vice versa. Effective project development is the same. We believe in finding the right balance
        between efficient processes.`}
    ];

    dataApp.globalPromise().then(() => {
      if (dataApp.getData('blogs').length > 3) {
        this.blogs = $filter('publicStatus')(dataApp.getData('blogs')).slice(0, 3);
      } else {
        this.blogs = $filter('publicStatus')(dataApp.getData('blogs'));
      }

      this.projects = $filter('publicStatus')(dataApp.getData('projects'));
      this.reviews = dataApp.getData('reviews');

      this.slickConfigReview.enabled = true;
      this.slickConfigProjects.enabled = true;
    });

    let commonSlickConfig = {
      enabled: false,
      dots: true,
      infinite: true,
      autoplay: false,
      prevArrow: false,
      nextArrow: false,
      swipe: true,
      autoplaySpeed: 6000,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      speed: 1000,
    };

    this.slickConfigReview = Object.assign({}, {
      method: {
        slickPrev: () => {
        },
        slickNext: () => {
        }
      }
    }, commonSlickConfig);

    this.slickConfigProjects = Object.assign({}, commonSlickConfig);

    this.slickConfigDoMore = Object.assign({}, commonSlickConfig);
  }

  $onInit() {
    let oneStart = true;
    if(window.innerWidth <= 660 && oneStart) {
      this.slickConfigDoMore.enabled = true;
      oneStart = false;
    }

    angular.element(window).bind('resize', () => {
      if(window.innerWidth <= 660 && oneStart) {
        this.$scope.$apply(this.slickConfigDoMore.enabled = true);
        oneStart = false;
      }

      if(window.innerWidth > 660 && !oneStart) {
        this.$scope.$apply(this.slickConfigDoMore.enabled = false);
        oneStart = true;
      }

    })
  }

}

HomeController.$inject = ['dataApp', 'url', '$state', '$filter', '$scope'];

export {HomeController};
