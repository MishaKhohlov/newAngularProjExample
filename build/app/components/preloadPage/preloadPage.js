import $ from 'jquery';

export const preloadPage = (() => {
  let ajaxQueue = {}, ajaxRequestObj = {};

  function initRequest() {
    if(Object.keys(ajaxQueue).length > 0) {

      for(let objItemProp in ajaxQueue) {
        let url = ajaxQueue[objItemProp].url;
        let obj = ajaxQueue[objItemProp].obj;

        ajaxRequestObj[url] = $.ajax({
          type: 'get',
          url,
          success: (data) => {
            delete obj.templateUrl;
            obj.template = data;
          }
        })

      }
    }
  }

  setTimeout(initRequest, 2000);

  return {
    addRequest: (url, obj) => {
      ajaxQueue[url] = {url, obj}
    },
    abort: (url) => {
      if(ajaxRequestObj[url]) {
        ajaxRequestObj[url].abort();
      }
      if(ajaxQueue[url]) {
        delete ajaxQueue[url];
      }
    }
  }
})();
