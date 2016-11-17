class ArticleController {
  constructor($stateParams, dataApp) {
    this.$stateParams = $stateParams;
    console.log($stateParams.id);
    dataApp.globalPromise().then(() => {
      this.blogs = dataApp.getData('blogs');
    });
  }
}

ArticleController.$inject = ['$stateParams', 'dataApp'];

export { ArticleController };
