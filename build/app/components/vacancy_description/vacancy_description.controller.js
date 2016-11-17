class VacancyController {
  constructor($stateParams, dataApp) {
    this.$stateParams = $stateParams;
    this.vacancy = $stateParams.vacancy;

    dataApp.globalPromise().then(() => {
      this.dataVacancy = dataApp.getData('vacancies', this.vacancy);
    });

    this.vacanciesList = [
      {
        title: 'Required skills & experience',
        section: 'skills'
      },
      {
        title: 'We offer you',
        section: 'offer'
      },
      {
        title: 'The vision',
        section: 'vision'
      }
    ]
  }
}

VacancyController.$inject = ['$stateParams', 'dataApp'];

export { VacancyController };
