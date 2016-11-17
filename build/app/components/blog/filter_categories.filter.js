export const filterCategories = ($stateParams) => {
  return (input, select) => {
    // !$stateParams.key
    if (input) {
      let newList = input.filter((val, key) => {
        if (val.category.value === select || select === '') {
          if(val.public) {
            val.key = key;
            return val
          }
        }
      });

      if(newList[0]) {
        return newList

      }
    }
  }
};

filterCategories.$inject = ['$stateParams'];
