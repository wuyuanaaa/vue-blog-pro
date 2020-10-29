<template>
  <div class="comment-part">
    <img v-imgMore class="comment-avatar" :src="comment.user.avatar" alt="">
    <div class="comment-content">
      <div class="content-userName">{{ comment.user.nickname ||'用户名好像不见了' }}</div>
      <div class="content-content"><span v-if="comment.follow">回复 <span class="content-userName">{{ comment.follow.nickname }}</span>：</span>{{ comment.content }}</div>
      <div class="content-info">
        <span class="comment-date">{{ comment.createdAt | timeFromNow }}</span>
        <button class="comment-btn comment-btn-reply" @click="addCommentClick">
          <svg-icon icon-class="comment" class-name="comment-icon" />
          <span class="comment-text">回复</span>
        </button>
        <commentInput
          v-if="isShowInput"
          :follow="comment.user.id"
          :superior="superior ? superior.id : comment.id"
          @hideInput="hideInput"
        />
      </div>
      <commentItem
        v-for="item in comment.followList"
        :key="item.id"
        :superior="comment"
        :comment="item"
        class="comment-follow"
      />
    </div>
  </div>
</template>

<script>
import commentInput from './Input'
import { removeComment, removeFollowComment } from '@/api/comment'
import { timeFromNow } from '@/filters'

export default {
  name: 'CommentItem',
  filters: {
    timeFromNow
  },
  components: {
    commentInput
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    superior: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      isShowInput: false
    }
  },
  methods: {
    // 回复评论
    addCommentClick() {
      this.isShowInput = true
    },
    // 删除评论
    removeCommentClick(id, topId) {
      const data = {
        _id: id
      }
      let requestFn
      if (topId) {
        data.top_id = topId
        requestFn = removeFollowComment
      } else {
        requestFn = removeComment
      }
      requestFn(data)
        .then(() => {
          this.$Message.success('删除成功!')
          this.getComments()
        }).catch((e) => {
          this.$Message.error(e.msg || '删除失败')
        })
    },
    // 移除输入框
    hideInput() {
      this.isShowInput = false
    },
    // 传递 getComments
    getComments() {
      this.$emit('getComments')
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-part {
    display: flex;
    padding: 10px 0;
    &:last-child{
      margin-bottom: 0;
      .comment-content {
        border-bottom: none;
      }
    }
    &:hover {
      .content-info .comment-btn {
        display: block;
      }
    }
    .comment-avatar{
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.10);
    }
    .comment-content {
      flex: 1;
      padding-bottom: 10px;
      border-bottom: 1px solid @color-border-tint; /*no*/
      .content-userName {
        margin-bottom: 6px;
        color: @color-main;
      }
      .content-content {
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 1.5;
      }
    }
    .content-info {
      margin: 10px 0;
      color: @color-tint;
      transition: height 0.5s;
      .comment-btn {
        display: none;
        float: right;
        margin-left: 20px;
        border: none;
        background-color: transparent;
        color: inherit;
        cursor: pointer;
      }
      .comment-icon {
        margin-top: 0.1em;
        margin-right: 4px;
        font-size: 16px;
        vertical-align: top;
      }
      .comment-text {
        display: inline-block;
        vertical-align: top;
      }
    }
    div.comment-follow {
      padding: 10px;
      background: rgba(0,0,0,0.02);
      .comment-content {
        padding-bottom: 0;
      }
      .comment-input {
        background-color: #fff;
      }
    }
  }

</style>
