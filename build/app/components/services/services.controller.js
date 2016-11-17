class servicesController {
  constructor(tech, $rootScope) {
    this.tech = tech;
    this.$rootScope = $rootScope;
  }
}

servicesController.$inject = ['tech', '$rootScope'];

export { servicesController };
