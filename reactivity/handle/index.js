export default {
  get: function (target, key) {
    console.log('get操作拦截')
    return Reflect.get(target, key)
  }
}