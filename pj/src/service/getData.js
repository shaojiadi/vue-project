import axios from 'axios'

// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";  //设置请求头,[自定义]
// axios.defaults.withCredentials=true;  //前端跨域传递Cookie设置

//在请求时在请求参数上统一添加参数
axios.interceptors.request.use((config) => {
    // const { contentType } = config
    // 请求token判断
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + user.accessToken;
    // }
    // // 如果是表单请求
    // if (config.headers['Content-Type'] == ContentType.FORM) {
    //   config.data = qs.stringify(config.data)
    // }else if(config.headers['Content-Type'] == ContentType.UPLOAD){
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // } else {
    //   config.headers['Content-Type'] = contentType || 'application/json'
    // }
    return config
  },(error) => Promise.reject(error)
)

// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  if (res.data.code == 2) {
      // localStorage.setItem('fullPath', router.history.current.fullPath)
  
      // mobile.removeStore('parkToken')
      // mobile.removeCookie('parkToken')
      // store.state.parkToken = ''
      // mobile.removeStore('userPhone')
      // mobile.removeCookie('userPhone')
      // mobile.removeCookie('userToken', domain)
      // mobile.removeCookie('userMobile', domain)
      // store.state.userPhone = ''

      return res

  }else {

  }
  // const contentTypes = ['application/msword', 'application/vnd.ms-excel', 'application/zip','application/octet-stream'] //word,excel,zip格式
  // const contentType = res.headers['content-type'].split(';')[0]
  
  // if (res.headers && contentTypes.indexOf(contentType) > -1) {
  //   if (res.config.method === 'post') {
  //     postDownload(res)
  //   }
  //   if (res.config.method === 'get') {
  //     getDownload(res.request.responseURL)
  //   }
  //   return { data: { code: 'success' } }
  // }
  return res
}, (err)=> {
  return Promise.reject(err)
})

const queryData = params => axios.get('/api', { params: params });

// export default service
export {
  queryData
}