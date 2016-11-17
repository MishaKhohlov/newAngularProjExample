const dataAppFunc = () => {
  let data = {}, promisesData, adminData = {};
  const standartUrl = 'http://test/back';

  return {
    $get: ['$http', '$q', ($http, $q) => {

      function postRequest(urlPart, formData) {
        const conf = {
          method: 'POST',
          url: standartUrl + urlPart,
          data: formData,
          headers: {
            'Content-Type': undefined
          }
        };

        return $http(conf)
      }

      function setData(newVal) {
        promisesData = newVal;
      }

      function globalPromise() {
        const prom = $q.defer();

        if (Object.keys(data).length > 0) {
          prom.resolve();
          return prom.promise
        }

        promisesData.then((request) => {
          data = request;
          prom.resolve();
        });

        return prom.promise
      }

      function getData(...keys) {
        let partData = {};
        keys.forEach((item, key) => {
          if (key === 0) {
            partData = data[keys[0]];
          } else {
            partData = partData[keys[key]];
          }
        });

        return partData
      }

      function getDataBlogForId(id) {
        let partData = {};
        data.blogs.find((elem, index) => {
          if(elem.id === id) {
            partData = elem;
            partData.index = index;
            return true
          } else {
            return false
          }
        });
        return partData
      }

      function getDataUpdate() {
        const prom = $q.defer();

        const conf = {
          method: 'GET',
          url: standartUrl + '/admin/data/getall',
        };

        $http(conf).then((request) => {
          data = request.data;
          prom.resolve();
        });

        return prom.promise
      }

      function getAdminData() {
        const prom = $q.defer();

        if (Object.keys(adminData).length === 0) {
          const conf = {
            method: 'GET',
            url: standartUrl + '/admin/data/getadmindata'
          };

          $http(conf).then((data) => {
            adminData = data.data;
            prom.resolve(adminData);
          }, (error) => {
            console.log(error);
          });

        } else {
          prom.resolve(adminData);
        }

        return prom.promise
      }

      function sendDataContacts(formData) {
        return postRequest('/admin/data/addcontact', formData);
      }

      function sendDataCV(formData) {
        return postRequest('/admin/data/addcv', formData);
      }

      function saveChangesPublicProps(formData) {
        return postRequest('/admin/data/changestatus', formData);
      }

      function createPost(formData) {
        return postRequest('/admin/data/createdata', formData);
      }

      function updatePost(formData) {
        return postRequest('/admin/data/updatedata', formData);
      }

      function deletePost(formData) {
        return postRequest('/admin/data/deletedata', formData);
      }

      function createCategory(formData) {
        return postRequest('/admin/data/addcategory', formData);
      }

      function deleteCategory(formData) {
        return postRequest('/admin/data/deletecategory', formData);
      }

      function deleteContact(type, formData) {
        let url;

        if(type === 'contacts') {
          url = 'deletecontact';
        } else {
          url = 'deletecv';
        }

        return postRequest('/admin/data/' + url, formData);
      }

      return {
        //  public
        globalPromise,
        setData,
        getData,
        getDataBlogForId,
        getDataUpdate,
        sendDataContacts,
        sendDataCV,
        saveChangesPublicProps,
        createPost,
        updatePost,
        deletePost,
        createCategory,
        deleteCategory,
        getAdminData,
        deleteContact
      }
    }]
  }
};

export {dataAppFunc};

