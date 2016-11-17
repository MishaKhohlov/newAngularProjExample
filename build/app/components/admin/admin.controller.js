class AdminController {
  constructor(authFact, $state) {
    this.authFact = authFact;
    this.$state = $state;
    this.invalid = false;
  }

  logged(ev, form) {
    ev.preventDefault();

    this.authFact.logged({
        username: form.login.$viewValue,
        password: form.password.$viewValue
      })
      .then(() => {
        this.invalid = false;
       // this.$state.go('edit');
      }, () => {
        this.invalid = true;
        console.log('data wrong');
      });
  }
}

AdminController.$inject = ['authFact', '$state'];

export {AdminController};
