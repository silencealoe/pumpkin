import request from '@/config/httpConfig.js';
export function login(){
  return request({
    url:'/index',
    method: 'get',
    params: {
    }
  })
}
