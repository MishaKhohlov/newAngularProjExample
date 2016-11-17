import $ from 'jquery';

class CompanyController {
  constructor(dataApp, url) {
    this.url = url;
    dataApp.globalPromise().then(() => {
      this.employees = dataApp.getData('employees');
      this.ourPhoto = dataApp.getData('ourPhoto');
      this.slickConfig.enabled = true;
    });

    this.slickConfig = {
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
      enabled: false,
      autoplay: false,
      prevArrow: false,
      nextArrow: false,
      swipe: true,
      autoplaySpeed: 6000,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      speed: 1000,
      method: {
        slickPrev: () => {},
        slickNext: () => {}
      }
    }
  }
}

CompanyController.$inject = ['dataApp', 'url'];

export { CompanyController };
