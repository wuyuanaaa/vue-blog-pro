import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

const TokenKey = 'Blog-Token'
const KEY = CryptoJS.enc.Latin1.parse('yuanaaatop_admin')

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function encryption({ data, param }) {
  const result = JSON.parse(JSON.stringify(data))

  param.forEach(k => {
    let cur = result[k]

    if (typeof cur === 'object') {
      cur = JSON.stringify(cur)
    }
    result[k] = encrypt(cur)
  })

  return result
}

function encrypt(str) {
  const encrypted = CryptoJS.AES.encrypt(
    str,
    KEY,
    {
      iv: KEY,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }
  )
  return encrypted.toString()
}

