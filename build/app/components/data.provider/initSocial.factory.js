const initSocial = () => {

  function facebook() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '194070951046901',
        xfbml: true,
        version: 'v2.8'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  function init() {
    facebook();
  }

  return {
    init
  }
};

initSocial.$inject = [];

export {initSocial}
