import request from '@/utils/request'

export function getArticlePage(params) {
  return request({
    url: '/article/page',
    method: 'get',
    params
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/article/detail/more',
    method: 'get',
    params: {
      id
    }
  })
}

export function getArticleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}
