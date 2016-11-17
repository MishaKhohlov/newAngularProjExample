import $ from 'jquery';

class BlogController {
  constructor(dataApp, url, urlBlog, $stateParams, $scope, $state, $filter, initSocial) {
    this.dataApp = dataApp;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.initSocial = initSocial;
    this.url = url;
    this.urlBlog = urlBlog;

    this.select = '';
    this.search = '';
    this.article = false;

    this.limitFrom = 0;
    this.limitTo = 10;
    this.currentpage = 1;
    this.paginationLength = false;

    this.createMeta = (data) => {
      const delProp = ["title", "description"];

      delProp.forEach((prop) => {
        $('meta' + '[property = "' + prop + '"]').remove();
      });
      let head = $('head');
      head.append(
        `<meta property="title" content="${data.title}" />
        <meta property="description" content="${data.description}" />`
      );
    };

    this.filtered = () => {
      let categoriesFiltered = $filter('categories')(this.blogs, this.select);
      let search = $filter('filter')(categoriesFiltered, this.search);
      this.blogsView = $filter('limitTo')(search, this.limitTo, this.limitFrom);

      if (this.select.length > 0 || this.search.length > 0) {
        if (search) {
          this.createPagination(search.length);
        } else {
          this.paginationLength = false;
          this.arrPaginationRepeat = false;
        }
      } else {
        this.createPagination(this.blogs.length);
      }
    };

    this.createPagination = (len) => {
      this.arrPaginationRepeat = [];
      this.paginationLength = false;
      for (let i = 0; i < len / 10; i++) {
        this.arrPaginationRepeat.push(i);
      }
      if (this.arrPaginationRepeat.length > 3) {
        this.paginationLength = this.arrPaginationRepeat.length;
      }
    };

    $scope.$on('$stateChangeStart', (ev, toState, toParams) => {
      if (toParams.key >= 0) {
        this.dataApp.globalPromise().then(() => {
          this.article = this.dataApp.getDataBlogForId(toParams.key + '');
          this.createMeta(this.article);

          let titleArr = this.article.title.split(' ');
          this.headTitle = titleArr.slice(0, titleArr.length - 1).join(' ');
          this.headSubTitle = titleArr.slice(titleArr.length - 1).join(' ');
        });
      } else {
        this.acticle = false;
        this.headTitle = false;
        this.headSubTitle = false;
      }
    });

    dataApp.globalPromise().then(() => {
      this.blogs = dataApp.getData('blogs');
      this.filtered();
      this.category = dataApp.getData('categories');
    });

  }

  $onInit() {
    if (this.$stateParams.key && !this.article) {
      this.dataApp.globalPromise().then(() => {
        this.article = this.dataApp.getDataBlogForId(this.$stateParams.key + '');
        if (this.article) {
          this.createMeta(this.article);
          let titleArr = this.article.title.split(' ');
          this.headTitle = titleArr.slice(0, titleArr.length - 1).join(' ');
          this.headSubTitle = titleArr.slice(titleArr.length - 1).join(' ');
        }
      });
    }

    this.initSocial.init();
  }

  goToPage(num) {
    this.currentpage = num;
    this.limitFrom = (num - 1) * 10;
    window.scrollTo(0, 0);
    this.filtered();
  }

  searchBlogsItem() {
    this.currentpage = 1;
    this.limitFrom = 0;
    this.filtered();
  }

  goToAllCategories() {
    this.select = '';
    this.filtered();
    if (this.$stateParams.key) {
      this.$state.go('blog')
    }
    this.currentpage = 1;
  }

  goToCertainCategories(selectVal) {
    this.currentpage = 1;
    this.limitFrom = 0;
    this.select = selectVal;
    this.filtered();
    if (this.$stateParams.key) {
      this.$state.go('blog')
    }
  }

  shareBlog(ev, key, type) {
    ev.preventDefault();
    let articleShare = this.dataApp.getData('blogs', key);

    this.createMeta(articleShare);

    let shareObj = {
      facebook: () => {
        FB.ui(
          {
            method: 'feed',
            name: articleShare.title,
            link: this.urlBlog ,
            picture: this.url + articleShare.img,
            caption: 'Knubisoft blog',
            description: articleShare.description,
            message: ''
          }
        );
      }
    };

    shareObj[type].call(this);
  }

}

BlogController.$inject = [
  'dataApp',
  'url',
  'urlBlog',
  '$stateParams',
  '$scope',
  '$state',
  '$filter',
  'initSocial'];

export {BlogController};
