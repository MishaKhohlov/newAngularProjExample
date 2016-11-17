class ContactsController {
  constructor(dataApp, $timeout, $state) {
    this.dataApp = dataApp;
    this.$timeout = $timeout;
    this.$state = $state;
    // only number
    this.numberRegExp = '\\d+';
    this.success = false
  }

  sendForm(ev, form) {
    ev.preventDefault();

    let formData = new FormData();

    formData.append('firstName', form.firstname.$viewValue);
    if(form.description.$viewValue) {
      formData.append('description', form.description.$viewValue);
    }
    formData.append('lastName', form.lastname.$viewValue);
    formData.append('email', form.email.$viewValue);
    formData.append('phone', form.phone.$viewValue);

    this.dataApp.sendDataContacts(formData).then((reques) => {
      this.success = 'Success';

      this.$timeout(() => {
        this.success = false;
        this.$state.go('home');
      }, 3000);

    }, (error) => {
      this.success = 'Error'
    });

    form.$setPristine();
    form.$setUntouched();

    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.email = '';
    this.description = '';
  }
}

ContactsController.$inject = ['dataApp', '$timeout', '$state'];

export {ContactsController};
