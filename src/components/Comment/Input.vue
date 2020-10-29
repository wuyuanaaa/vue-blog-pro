<template>
  <div class="comment-input">
    <span ref="face" class="input-face" @click.stop="handleSelectFace">
      <svg-icon icon-class="face" />
    </span>
    <div class="input-content" @click.stop="inputClick">
      <Textarea
        ref="inputTextarea"
        v-model="value"
        class="input-textarea"
        :autofocus="autofocus"
        placeholder="说点什么..."
        @on-focus="textareaFocus"
      />
      <div v-show="isControlShow" class="input-control clearfix">
        <el-button
          type="primary"
          class="control-commit"
          :disabled="isValueEmpty ? 'disabled' : false"
          @click="handleSubmit"
        >
          评论
        </el-button>
      </div>
    </div>

    <div v-show="isfaceSelect" class="face-select" :style="faceSelectStyle">
      <div class="face-label">
        <span
          v-for="(item, index) in faceList"
          :key="item.name"
          class="label-item"
          :title="item.label"
          :class="{active: curFace === index}"
          @click.stop="handleChangeFaceList(index)"
        >
          <svg-icon :icon-class="item.icon" />
        </span>
      </div>
      <div class="face-list">
        <span
          v-for="(face, index) in curFaceList"
          :key="index"
          class="face-item"
          @click="handleFaceClick(index)"
        >{{ face }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Textarea from '@/components/Textarea'
import { createComment } from '@/api/comment'

import { mapGetters } from 'vuex'
import faceList from './face'

export default {
  name: 'CommentInput',
  components: {
    Textarea
  },
  props: {
    follow: {
      type: String,
      default: ''
    },
    superior: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      isControlShow: false,
      isfaceSelect: false,
      faceList: faceList,
      faceSelectPosition: {
        x: 0,
        y: 0
      },
      curFace: 0
    }
  },
  inject: ['Comment'],
  computed: {
    ...mapGetters(['isLogin', 'userInfo']),
    isValueEmpty() { // isValueEmpty
      return this.value.length === 0
    },
    curFaceList() {
      return faceList[this.curFace].list
    },
    faceSelectStyle() {
      return {
        top: this.faceSelectPosition.y + 'px',
        left: this.faceSelectPosition.x + 'px'
      }
    }
  },
  mounted() {
    // 添加 document 的 click 事件， 点击非输入组件部分隐藏输入组件
    if (this.follow) {
      this.$refs.inputTextarea.focus()
      document.addEventListener('click', this.hideInput, false)
    } else {
      document.addEventListener('click', this.textareaBlur, false)
    }
    window.addEventListener('scroll', this.pageScroll)
  },
  beforeDestroy() {
    // 移除 document 的 click 事件
    if (this.follow) {
      document.removeEventListener('click', this.hideInput, false)
    } else {
      document.removeEventListener('click', this.textareaBlur, false)
    }
    window.removeEventListener('scroll', this.pageScroll)
  },
  methods: {
    textareaFocus() {
      this.isControlShow = true
    },
    textareaBlur() {
      this.isfaceSelect = false
      this.isValueEmpty && (this.isControlShow = false)
    },
    // 发表一级评论
    handleSubmit() {
      if (!this.isLogin) {
        this.$store.dispatch('app/updateIsLoginDialogShow', true)
        return
      }

      const commentData = {
        user: this.userInfo.id,
        content: this.value,
        article: this.Comment.articleId
      }
      if (this.follow) {
        commentData.follow = this.follow
        commentData.superior = this.superior
      }
      createComment(commentData)
        .then(() => {
          this.$Message.success('评论成功！')
          // 清空输入框 触发输入框失焦事件
          this.value = ''
          this.textareaBlur()
          this.Comment.fetchComments()
          // 如果是二级评论 隐藏输入框
          if (this.follow) {
            this.$emit('hideInput')
          }
        }).catch(() => {
          this.$Message.error('评论失败！请稍后再试。')
        })
    },

    // 隐藏输入框
    hideInput() {
      this.isfaceSelect = false
      if (!this.value) {
        this.$emit('hideInput')
      }
    },
    // inputClick
    inputClick() {
      return false
    },
    handleSelectFace(e) {
      const { offsetTop: y, offsetLeft: x } = this.$refs.face
      this.faceSelectPosition = { x, y }
      this.isfaceSelect = !this.isfaceSelect
    },
    handleChangeFaceList(index) {
      this.curFace = index
    },
    handleFaceClick(index) {
      this.value += this.curFaceList[index]
    },
    pageScroll() {
      if (!this.isfaceSelect) {
        return
      }
      const { offsetTop: y, offsetLeft: x } = this.$refs.face
      this.faceSelectPosition = { x, y }
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-input {
    margin: 10px 0;
    display: flex;
    background-color: rgba(0,0,0,0.02);
  }

  .input-face {
    margin: 13px 5px 0 10px;
    width: 34px;
    height: 34px;
    line-height: 34px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
  }

  .input-content {
    flex: 1;
    padding: 14px 10px 14px 0;
    border-radius: 4px;

    .input-textarea {
      overflow-x: hidden;
    }
    .input-textarea>textarea {
      resize: none;
      overflow-x: hidden;
    }
    .input-control {
      margin-top: 10px;
      .control-commit {
        float: right;
        padding: 0 0.8em;
        height: 30px;
        border: none;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
      .control-commit[disabled] {
        opacity: 0.6;
        background: @color-cloud;
      }
    }
  }

  .face-select {
    position: absolute;
    max-width: 400px;
    transform: translateY(-100%);
    z-index: 10;
    background: #fff;
    border: 1px solid @color-border;

    .face-label {
      border-bottom: 1px solid @color-border;
    }
    .label-item {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: @color-tint;
      }
      &.active {
        color: @color-main;
        background: rgba(0,0,0,0.1);
      }
    }

    .face-list {
      height: 200px;
      overflow: auto;
      .face-item {
        display: inline-block;
        width: 1.6em;
        font-size: @font-size-md;
        height: 1.6em;
        padding: 0.2em;
        cursor: pointer;
      }
    }
  }

</style>
