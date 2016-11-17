class callBackFormController {
  constructor(dataApp, $scope, $timeout, $stateParams) {
    this.dataApp = dataApp;
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.$scope = $scope;

    this.attachFileName = 'Attach your CV';
    this.$file = false;

    this.numberRegExp = '\\d+';
    this.attachFileName = 'Attach your CV';

    this.success = false;

    this.dataApp.globalPromise().then(() => {
      this.vacancy = this.dataApp.getData('vacancies', $stateParams.direction);
      console.log(this.vacancy);
    });
  }

  sendForm(ev, form) {
    ev.preventDefault();

    let formData = new FormData();
    formData.append('fileCv', this.$file);

    let data = {
      name: form.name.$viewValue,
      email: form.email.$viewValue,
      phone: form.phone.$viewValue,
      vacancy: this.$stateParams.direction
    };
    for(let key in data) {
      formData.append(key, data[key]);
    }

    this.dataApp.sendDataCV(formData).then((data) => {
      this.success = 'Success';
    }, () => {
      this.success = 'Error';
    });

    form.$setPristine();
    form.$setUntouched();

    this.$file = false;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.attachFileName = 'Attach your CV';

    this.$timeout(() => {
      this.success = false;
    }, 3000)
  }
}

callBackFormController.$inject = ['dataApp', '$scope', '$timeout', '$stateParams'];

export {callBackFormController};
