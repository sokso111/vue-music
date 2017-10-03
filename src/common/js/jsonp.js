import originJSONP from 'jsonp'

export default function jsonp (url, data, option) {
  // 判断url路径是否包含 ？ 如果包含则传参
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
  // 返回Promise构造函数，接收一个参数，为函数，并且传入两个参数resolve和reject，分别表示异步操作成功后的回调函数与失败的回调函数
  // Promise对象可以调用原型上的then()方法，接受一个参数，为函数，可以得到resolve是传入的参数
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function params (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
