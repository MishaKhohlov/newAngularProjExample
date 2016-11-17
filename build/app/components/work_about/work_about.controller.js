class WorkAboutController {
  constructor($stateParams, dataApp, url, $filter, $location) {
    this.$location = $location;
    this.dataApp = dataApp;
    this.key = $stateParams.key;
    this.url = url;
    this.activePosition = '';
    this.lengthAllItem = 0;
    this.currentIndex = null;

    this.dataApp.globalPromise().then(() => {
      this.projectsAll = this.dataApp.getData('projects');
      this.lengthAllItem = Object.keys(this.projectsAll).length - 1;

      Object.keys(this.projectsAll).find((el, index) => {
        if (this.key === el) {
          this.currentIndex = index;
          return true
        }
        return false
      });

      this.projects = this.projectsAll[this.key];
      this.blogs = $filter('publicStatus')(dataApp.getData('blogs')).slice(0, 3);
    });
  }

  goToNextProject() {
    ++this.currentIndex;
    this.$location.path('/works/' + Object.keys(this.projectsAll)[this.currentIndex]).replace();
  }

  goToPrevProject() {
    --this.currentIndex;
    this.$location.path('/works/' + Object.keys(this.projectsAll)[this.currentIndex]).replace();
  }

}

WorkAboutController.$inject = ['$stateParams', 'dataApp', 'url', '$filter', '$location'];

export {WorkAboutController};
