import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function githubLogin(params) {
  return request({
    url: '/user/github',
    method: 'get',
    params
  })
}

export function getUserInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}

export function sendCodeEmail(email) {
  return request({
    url: '/user/sendCode',
    method: 'post',
    data: {
      email
    }
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
