// async function someAsyncFunction(item) {
//   const res = await new Promise(resolve => {
//     setTimeout(() => {
//       resolve(item);
//     }, 1000);
//   });
//   // return res;
// }

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

const task = [1,2]
task.map(()=>222)
console.log('task', task);
