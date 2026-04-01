/**
 * 并发控制
 */
class AsyncPool {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  add (promiseFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseFn,
        resolve,
        reject
      });
      this.run()
    })
  }

  async run () {
    if (this.running >= this.limit || !this.queue.length) {
      return;
    }
    this.running++;
    console.log('running..',this.running,this.limit);

    const { promiseFn, resolve, reject } = this.queue.shift();
    try {
      const res = await promiseFn;
      // console.log('running..', res);
      resolve(res)
    } catch (e) {
      reject(e)
    } finally {
      this.running--;
      this.run()
    }
  }
}

const arr = new Array(18).fill(1).map((_, i) => new Promise(resolve => {
  setTimeout(() => {
    resolve(i + 1);
  }, 2000);
}));


// Promise.all(arr).then(res => {
//   console.log('res', res);
// })
const pool = new AsyncPool(5)
Promise.all(arr.map(item => pool.add(item))).then(res => {
  console.log('res', res);
})