import request from '@/utils/request'

/**
 * 获取文章评论列表
 * @param {Number} id 文章Id
 */
export function getComment(article) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: {
      article
    }
  })
}

/**
 * 新增一级评论
 * @param {Object} data 评论数据
 */
export function createComment(data) {
  return request({
    url: 'comment/create',
    method: 'post',
    data
  })
}

/**
 * 新增二级评论
 * @param {Object} data 评论数据
 */
export function saveFollowComment(data) {
  return request({
    url: 'comment/save_follow_comment',
    method: 'post',
    data
  })
}

/**
 * 删除一级评论
 * @param {Object} data 评论数据
 */
export function removeComment(data) {
  return request({
    url: 'comment/remove_comment',
    method: 'post',
    data
  })
}

/**
 * 删除二级评论
 * @param {Object} data 评论数据
 */
export function removeFollowComment(data) {
  return request({
    url: 'comment/remove_follow_comment',
    method: 'post',
    data
  })
}
