import $ from 'jquery';

class AppController {
  //$translate, customStorage
  constructor(authFact, $rootScope, dataApp, $state, $document, $timeout) {
    // this.$translate = $translate;
    // this.customStorage = customStorage;
    this.$rootScope = $rootScope;
    this.dataApp = dataApp;
    this.$state = $state;
    this.$document = $document;
    this.$timeout = $timeout;
    this.body = angular.element(document).find('body');

    this.$rootScope.request = false;

    this.linksHeader = [
      {component: 'services', name: 'services'},
      {component: 'work', name: 'portfolio'},
      {component: 'company', name: 'company'},
      {component: 'contacts', name: 'contacts'},
    ];
    this.linksFooter = [
      {component: 'services', name: 'services'},
      {component: 'work', name: 'portfolio'},
      {component: 'company', name: 'company'},
      {component: 'careers', name: 'careers'},
      {component: 'blog', name: 'blog'},
      {component: 'contacts', name: 'contacts'},
    ];
  }

  sendRequestForm(ev, form) {
    ev.preventDefault();

    let formData = new FormData();

    formData.append('firstName', form.firstname.$viewValue);
    if(form.description.$viewValue) {
      formData.append('description', form.description.$viewValue);
    }
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
    this.phone = '';
    this.email = '';
    this.description = '';

    this.$rootScope.request = false;
    this.body.removeClass('overflow');
  }

  initPopup() {
    this.body.addClass('overflow');
  }

  closePopUp(ev) {
    if(angular.element(ev.target).hasClass('reqQuotePopup')) {
      this.body.removeClass('overflow');
      this.$rootScope.request = false;
    }
  }

  enadledScrollAndClose() {
    this.$rootScope.request = false;
    this.body.removeClass('overflow');
  }

  goUp(ev) {
    if(this.$state.current.name === 'home') {
      ev.preventDefault();
      $('html, body').animate({scrollTop: 0}, 1500);
      this.toogleBurgerMenuBottom = false;
    }
  }

  toogleMenu() {
    this.toogleBurgerMenuUp = false;
    this.toogleBurgerMenuBottom = false;
  }
}

// '$translate', 'customStorage'
AppController.$inject = ['authFact', '$rootScope', 'dataApp', '$state', '$document', '$timeout'];

export {AppController};
