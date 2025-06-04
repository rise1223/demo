import handle from "./handle/index.js"

export default function (target) {
  return new Proxy(target, handle)
}