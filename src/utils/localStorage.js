
const BASE_KEY = 'blog-'

export const newUserKey = 'NEW_USER'

export function getStorage(key) {
  let item = localStorage.getItem(BASE_KEY + key)
  // 未找到
  if (item === undefined || item === null) {
    return undefined
  }

  item = JSON.parse(item)
  // 非 Object 直接返回
  if (typeof item !== 'object') {
    return item
  }

  const { _expiration, _data } = item
  // 非自定义封装 对象 直接返回
  if (!_expiration && !_data) {
    return item
  }
  // 未设置过期时间
  if (!_expiration || _expiration === 0) {
    return _data
  }
  // 对比过期时间 如果过期返回 undefined
  const now = (new Date()).getTime()
  if (now > _expiration) {
    return undefined
  }

  return _data
}

/**
 * 获取 localStorage
 * @param {String} key key
 * @param {Any} value 存储的值
 * @param {Object} maxAge 保存时间 d 天 h 时 m 分 s 秒
 */
export function setStorage(key, value, maxAge) {
  key = BASE_KEY + key
  // 防止 JSON.stringify 结果 'null'
  if (value === null) {
    value = {}
  }

  if (value === undefined) {
    localStorage.removeItem(key)
    return
  }

  if (!maxAge || typeof maxAge !== 'object') {
    localStorage.setItem(key, JSON.stringify({
      _data: value
    }))
    return
  }
  // 计算过期时间
  let { d, h, m, s } = maxAge
  d = d ? d * 24 * 60 * 60 * 1000 : 0
  h = h ? h * 60 * 60 * 1000 : 0
  m = m ? m * 60 * 1000 : 0
  s = s ? s * 1000 : 0

  const _expiration = +new Date() + d + h + m + s
  localStorage.setItem(key, JSON.stringify({
    _data: value,
    _expiration
  }))
}

