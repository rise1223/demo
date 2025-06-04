import reactive from "./reactive.js"

const o = {
  a: 1,
  b: 2
}
const po = reactive(o)
console.log("init reactivity",po.a);