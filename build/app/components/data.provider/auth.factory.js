const authorizationFactory = ($rootScope, $q, $state, $http) => {
  let authUser = false;
  const standartUrl = 'http://test/back';

  function logged(dataUser) {
    const prom = $q.defer();

    let conf = {
      method: 'POST',
      url: standartUrl + '/admin/login/start',
      data: dataUser
    };

    $http(conf)
      .then((data) => {
        console.log(data);
        authUser = data.data;
        prom.resolve(authUser);
      }, (error) => {
        prom.reject(error);
      });

    return prom.promise;
  }

  function logout() {
    authUser = false;
    $state.go('home');
  }


  function auth() {
    const prom = $q.defer();
    if (authUser.status) {
      prom.resolve(authUser);
    } else {
      prom.reject('Log out');
    }

    return prom.promise;
  }

  return {
    auth,
    logout,
    logged
  };
};

authorizationFactory.$inject = ['$rootScope', '$q', '$state', '$http'];

export {authorizationFactory};


