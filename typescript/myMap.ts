const myMap = <T, R>(arr: T[], cb: (val: T) => R): R[] => {
  let result: R[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push(cb(arr[i]));
  }
  return result;
}

console.log(myMap([2, 4, 6], (val) => val * 2));
