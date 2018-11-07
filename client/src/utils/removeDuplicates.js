export const removeDuplicates = (arr, prop) => {
  let obj = {};
  return Object.keys(
    arr.reduce((prev, next) => {
      if (!obj[next[prop]]) obj[next[prop]] = next;
      return obj;
    }, obj)
  ).map(i => obj[i]);
};
