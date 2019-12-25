import axios from 'axios'
import { Message } from 'element-ui'
const http = {}

// axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL:'http://localhost:3000',
  timeout: 5000
})
console.log('aaaa')
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // 打开loading
    // showAllLoading();
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    console.log('response', response)
    const res = response.data 
    if(response.data.header.resultCode!==200){
      alert('没有权限访问')
      return Promise.reject(res)
    }
      return response.data
  },
  err => {
      if (err && err.response) {
      } else {
          err.message = '连接服务器失败'
      }
      // Message.error({
      //     message: err.message
      // })
      return Promise.reject(err.response)
  }
)
console.log('aaaa')
export default service
