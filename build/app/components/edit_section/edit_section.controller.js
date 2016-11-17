class EditSectionController {
  constructor(dataApp, $stateParams, $timeout, tech, $state) {
    this.$stateParams = $stateParams;
    this.dataApp = dataApp;
    this.$timeout = $timeout;
    this.$state = $state;
    this.success = false;
    this.attachFileName = 'Attach your Blog Images';

    this.$file = false;

    this.$fileProjects = [];
    this.attachFileNameProjects = [
      'Attach your imgTitleHome',
      'Attach your imgTitle',
      'Attach your imgContent',
      'Attach your imgContent 2'];
    this.metaAddName = ['description'];

    this.technologyAll = tech;

    this.dataApp.globalPromise().then(() => {
      this.category = dataApp.getData('categories');
    });

    if ($stateParams.key !== 'create') {
      this.dataApp.globalPromise().then(() => {
        this[$stateParams.section] = dataApp.getData($stateParams.section, $stateParams.key);
      })
    } else {
      this.vacancies = {
        public: true,
        position: '',
        skills: [''],
        vision: [''],
        offer: [''],
        description: ''
      };

      this.blogs = {
        title: '',
        titleGoogle: '',
        meta: [''],
        category: '',
        public: true,
        description: '',
      };

      this.projects = {
        public: true,
        title: '',
        subTitle: '',
        description: '',
        challenge: '',
        process: '',
        result: '',
        technologies: []
      };
    }

    this.generateKey = (string) => {
      let key = '';
      string.split(' ').forEach((item, i) => {
        key += i === 0 ? item : item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
      });

      return key;
    };

    this.successReuqest = (request) => {
      console.log(request.data);
      this.success = 'Success';

      this.$timeout(() => {
        this.success = false;
        this.$state.go('edit', {'currentState': $stateParams.section});
      }, 1000)
    };

    this.errorRequest = (error) => {
      console.log(error);
      this.success = 'Error';
    }

  }

  goHome($event) {
    $event.preventDefault();
    this.$state.go('edit', {'currentState': this.$stateParams.section});
  }

  addInput(section, key) {
    this[section][key].push('')
  }

  saveData(section) {
    let sendObj = {};
    let formData = new FormData();

    let sectionObj = {
      vacancies,
      blogs,
      projects
    };

    function vacancies() {
      formData.append('section', section);

      if (this.$stateParams.key === 'create') {
        formData.append('key', this.generateKey(this[section].position));
      } else {
        formData.append('key', this.$stateParams.key);
      }

      formData.append('data', JSON.stringify(this[section]));

      sendObj = formData;
    }

    function blogs() {
      formData.append('file', this.$file);
      formData.append('section', section);
      formData.append('key', this[section].id ? this[section].id : false);
      formData.append('data', JSON.stringify(this[section]));

      sendObj = formData;
    }

    function projects() {
      formData.append('imgTitleHome', this.$fileProjects[0]);
      formData.append('imgTitle', this.$fileProjects[1]);
      formData.append('imgContent', this.$fileProjects[2]);
      formData.append('imgContent2', this.$fileProjects[3]);

      formData.append('section', section);

      if (this.$stateParams.key === 'create') {
        formData.append('key', this.generateKey(this[section].title));
      } else {
        formData.append('key', this.$stateParams.key);
      }

      formData.append('data', JSON.stringify(this[section]));

      sendObj = formData;
    }

    sectionObj[section].call(this);

    if (this.$stateParams.key !== 'create') {
      this.dataApp.updatePost(sendObj).then(this.successReuqest, this.errorRequest);
    } else {
      this.dataApp.createPost(sendObj).then(this.successReuqest, this.errorRequest);
    }

    // reset
    sendObj = {};
    this.attachFileName = 'Attach your CV';
    this.attachFileNameProjects = [
      'Attach your imgTitleHome',
      'Attach your imgTitle',
      'Attach your imgContent',
      'Attach your imgContent 2'];


  }

  deletePost() {
    let formData = new FormData();

    formData.append('section', this.$stateParams.section);

    if (this.$stateParams.section !== 'blogs') {
      formData.append('key', this.$stateParams.key);
    } else {
      formData.append('key', this.blogs.id);
    }


    this.dataApp.deletePost(formData).then(this.successReuqest, this.errorRequest);
  }
}

EditSectionController.$inject = ['dataApp', '$stateParams', '$timeout', 'tech', '$state'];

export {EditSectionController};
