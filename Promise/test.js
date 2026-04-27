let p1 = new Promise((resolve, reject) => resolve());
let p2 = Promise.resolve();
console.log('sync__p1', p1);
console.log('sync__p2', p2);
setTimeout(() => {
  console.log('p1', p1);
  console.log('p2', p2);
}, 1000);