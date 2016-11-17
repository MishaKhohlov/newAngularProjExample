class BlogAboutController {
  constructor($stateParams, dataApp, $location, initSocial, $state, urlBlog) {
    this.dataApp = dataApp;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.initSocial = initSocial;
    this.$state = $state;
    this.urlBlog = urlBlog;
  }

  goToArcticle(direction) {
    let goId;

    if(direction) {
      goId = this.blogs[this.article.index + 1].id;
    } else {
      goId = this.blogs[this.article.index - 1].id;
    }

    this.$location.path('/blog/article/' + goId).replace();
  }

  shareSocial(ev, type) {
    this.share.call(this.context, ev, this.$stateParams.key, type);
  }
}

BlogAboutController.$inject = ['$stateParams', 'dataApp', '$location', 'initSocial', '$state', 'urlBlog'];

export { BlogAboutController };
