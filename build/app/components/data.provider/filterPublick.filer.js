export const filterPublick = () => {
  return (input) => {
    if (input) {
      if (toString.call(input) === '[object Object]') {
        let obj = {};

        for (let item in input) {
          if (input[item].public) {
            obj[item] = input[item]
          }
        }
        return obj
      } else if (toString.call(input) === '[object Array]') {
        let newList = input.filter((val) => {
          if (val.public) {
            return val
          }
        });

        if (newList[0]) {
          return newList
        }
      }

    }
  }
};

filterPublick.$inject = [];