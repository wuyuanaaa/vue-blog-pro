<template>
  <div v-if="articleTitle" class="comment">
    <div class="comment-title">评论</div>

    <CommentInput :article-id="articleId" />

    <div v-if="commentList" class="comment-list">
      <CommentItem
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
      />
    </div>

  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentInput from './Input'
import CommentItem from './Item'

export default {
  name: 'Comment',
  components: {
    CommentInput,
    CommentItem
  },
  props: {
    articleId: {
      type: String,
      required: true
    },
    articleTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentList: [],
      currentFollowId: '',
      showFollowInput: {}
    }
  },
  watch: {
    articleId: {
      immediate: true,
      handler() {
        this.fetchComments()
      }
    }
  },
  provide() {
    return {
      Comment: this
    }
  },
  methods: {
    // 获取评论
    fetchComments() {
      getComment(this.articleId)
        .then(list => {
          const firstLevMap = {}
          list.forEach(item => {
            if (!item.follow) {
              firstLevMap[item.id] = item
            } else {
              if (firstLevMap[item.superior]) {
                firstLevMap[item.superior].followList || (firstLevMap[item.superior].followList = [])
                firstLevMap[item.superior].followList.push(item)
              }
            }
          })
          this.commentList = list.filter(item => !item.follow)
        })
        .catch(e => {
          console.log('fetchComments err', e)
        })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .comment {
    .comment-title {
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
      font-size: @font-size-md;
      color: @color-tint;
    }
    .comment-list {
      padding: 0 10px;
    }

  }
</style>
