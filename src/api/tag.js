import request from '@/utils/request'

export function getTagDetail(id) {
  return request({
    url: '/tag/detail',
    method: 'get',
    params: { id }
  })
}
