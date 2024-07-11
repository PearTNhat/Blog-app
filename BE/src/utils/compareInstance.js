const compareTwoArrays = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
const compareCategories = (newData, origin) => {
  if (newData.length !== origin.length) return false;
  for (let i = 0; i < newData.length; i++) {
    if (newData[i]._id !== origin[i].toString()) return false;
  }
  return true;
};
const compareTwoObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !compareTwoObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};
const isObject = (object) => {
  return object != null && typeof object === "object";
};
export { compareTwoArrays, compareTwoObjects, compareCategories };
