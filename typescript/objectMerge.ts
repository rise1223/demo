/**
 * 详情合并
 * 以obj1的key为基准合并对象
 * @param obj1 待合并对象
 * @param obj2 合并对象
 */
export function objectMerge<T extends object, U extends T>(obj1: T, obj2: U): void {
  const obj1KeyArr = Reflect.ownKeys(obj1) as (keyof T)[];
  obj1KeyArr.forEach((key): void => {
    obj1[key] = obj2[key] ?? obj1[key];
  });
}

const o1 = {
  a: 1,
  b: 2,
  c: 3
}
const o2 = {
  a: 6,
  b: 7,
  c: 8,
  d: 9,
  e: 10,
  [Symbol("1")]: 4444
}

console.log(Reflect.ownKeys(o2));
console.log([...Object.getOwnPropertyNames(o2), ...Object.getOwnPropertySymbols(o2)]);
 objectMerge(o1, o2)
console.log('objectMerge:',o1);

