import axios from '@/axios'
const dataRequest = function (type, route, params, config) {
  let ajaxObj = {
    url: route,
    method: type,
    ...config
  }
  if (type === 'get' || type === 'delete') {
    ajaxObj.params = params
  } else {
    ajaxObj.data = params
  }
  return new Promise((resolve, reject) => {
    axios(ajaxObj).then((res) => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        reject(new Error({msg: res.data.msg || '请求失败'}))
      }
     
    }).catch((err) => {
      reject(err)
    })
  })
}
export default dataRequest