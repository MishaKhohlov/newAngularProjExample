class AdminEditController {
  constructor(authFact, dataApp, $scope, $timeout, url, $location) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$location = $location;
    this.authFact = authFact;
    this.dataApp = dataApp;
    this.url = url;

    this.section = ['vacancies', 'blogs', 'projects', 'categories', 'contacts', 'cv'];

    this.success = false;
    this.createCategoryWind = false;
    this.createCategoryValue = '';

    this.getData = () => {
      this.vacancies = this.dataApp.getData(this.section[0]);
      this.blogs = this.dataApp.getData(this.section[1]);
      this.projects = this.dataApp.getData(this.section[2]);
      this.category = this.dataApp.getData(this.section[3]);
    };

    this.dataApp.getAdminData().then((data) => {
      this.cv = data.cv;
      this.contacts = data.contacts;
    });

    this.updateData = (data) => {
      console.log(data);
      this.success = 'Change saved';
      this.errorStyle = 'btn-success';

      this.dataApp.getDataUpdate().then(this.getData);
      this.$timeout(()=> {
        this.success = false;
      }, 3000)
    };

    this.errorRequest = (error) => {
      console.log(error);
      this.errorStyle = 'btn-danger';
      this.success = 'Error, Check the Internet connection or contact your administrator';
    }
  }

  $onInit() {
    this.dataApp.getDataUpdate().then(this.getData);
    this.currentSection = this.$location.$$search.currentState ? this.$location.$$search.currentState : this.section[0];
  }

  logout() {
    this.authFact.logout()
  }

  confirmPublick(section, key) {
    let sendKey;

    this[section][key].public = !this[section][key].public;

    if (typeof key === 'number') {
      sendKey = this[section][key].id
    } else {
      sendKey = key
    }

    let sendObj = {
      section,
      key: sendKey,
      public: this[section][key].public
    };

    this.dataApp.saveChangesPublicProps(sendObj).then(this.updateData, this.errorRequest);
  }

  deleteCategory(name, key) {
    this.category.splice(key, 1);

    let formData = new FormData();
    formData.append('name', name);

    this.dataApp.deleteCategory(formData).then(this.updateData, this.errorRequest);
  }

  createCategory() {
    this.createCategoryWind = false;

    let formData = new FormData();
    formData.append('name', this.createCategoryValue);
    this.dataApp.createCategory(formData).then(this.updateData, this.errorRequest);

    this.createCategoryValue = '';
  }

  deletePost(section, key) {
    let formData = new FormData();

    formData.append('section', section);
    formData.append('key', key);

    this.dataApp.deletePost(formData).then(this.updateData, this.errorRequest);
  }

  deleteContact(type, id, key) {
    this[type].splice(key, 1);
    let formData = new FormData();
    formData.append('id', id);
    this.dataApp.deleteContact(type, formData).then(this.updateData, this.errorRequest);
  }
}

AdminEditController.$inject = ['authFact', 'dataApp', '$scope', '$timeout', 'url', '$location'];

export {AdminEditController};
