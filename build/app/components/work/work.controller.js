class WorkController {
  constructor(dataApp, url, $filter) {
    this.appData = dataApp;
    this.url = url;

    dataApp.globalPromise().then(() => {
      this.projects = $filter('publicStatus')(dataApp.getData('projects'));
    });
  }
}

WorkController.$inject = ['dataApp', 'url', '$filter'];

export { WorkController };
