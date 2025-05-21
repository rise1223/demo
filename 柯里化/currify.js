/**
 * 柯里化函数
 * @param {*} fn 
 * @returns 
 */
const curry = (fn) => {
  return function curried (...args) {
    console.log(fn.length, args);

    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return curry(fn.bind(this, ...args))

  }
}

const currify = (fn) => (...args) => args.length >= fn.length ? fn.apply(null, args) : currify(fn.bind(null, ...args))

var num = 5
function add (a, b, c) {
  const obj = {
    d: 10,
    get e () {
      return this.d + 5
    }
  }
  console.log('add：',this);
  
  return a + b + c + obj.e
}

const curriedAdd = currify(add);

console.log('res：', curriedAdd(1)(2)(3)); // 输出6
console.log('res：', curriedAdd(1, 2)(3)); // 输出6
console.log('res：', curriedAdd(1)(2, 3)); // 输出6
console.log('res：', curriedAdd(1, 2, 3)); // 输出6
console.log(curriedAdd(1, 2, 3));
