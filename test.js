// async function someAsyncFunction(item) {
//   const res = await new Promise(resolve => {
//     setTimeout(() => {
//       resolve(item);
//     }, 1000);
//   });
//   // return res;
// }

// const { tr, da } = require("element-plus/es/locales.mjs");

// async function example(items) {
//   for (let i = 0; i < items.length; i++) {
//     if (items[i] %2 === 0) {
//       await someAsyncFunction(items[i]);
//     }
//     console.log(i);
//   }
// }
// const items = [1, 2, 3, 4, 5];
// example(items)

// const task = [1,2]
// task.map(()=>222)
// console.log('task', task);



function defineReactive (data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      console.log(`get key：${key} value：${value}`);
      return value;
    },
    set (newVal) {
      console.log(`set key：${key} value：${value} => ${newVal}`);
      value = newVal;
    }
  })
}

function observe (data) {
  // console.log('Object.keys(data)', Object.keys(data));
  // console.log('Reflect.keys(data)', Reflect.keys(data));

  Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
}

const arr = [1, 2, 3, 4, 5, 6]
observe(arr)
arr["length"] = 888