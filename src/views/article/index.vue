<template>
  <div v-if="articleData" class="main article" :class="{'smallScreen': isSmallScreen}">
    <div class="article-content">
      <!--标题-->
      <h1 class="title">{{ articleData.title }}</h1>
      <!--信息-->
      <div class="info">
        <div class="info-row tags">
          <div v-for="(tag, index) in articleData.tags" :key="index" class="item-tags">
            <svg-icon icon-class="tag" class-name="icon" />
            <router-link class="text" :to="{name: 'Tag', params: {tag: tag.id}}">
              {{ tag.tagName }}
            </router-link>
          </div>
        </div>
        <div class="info-row clearfix">
          <div class="date">最后编辑于：<span>{{ articleData.updatedAt | formatComplete }}</span></div>
          <div class="read-count">阅读量：<span>{{ articleData.reading }}</span></div>
        </div>
      </div>
      <!--内容-->
      <div ref="content" v-highlight class="content md2html" v-html="articleData.html" />
      <!--其他-->
      <div class="more clearfix">
        <div v-if="prev" class="more-item more-prev">
          <router-link :to="{name: 'Article', params: {articleId: prev.id}}" replace>
            上一篇：{{ prev.title }}
          </router-link>
        </div>

        <div v-if="next" class="more-item more-next">
          <router-link :to="{name: 'Article', params: {articleId: next.id}}" replace>
            下一篇：{{ next.title }}
          </router-link>
        </div>
      </div>
      <!--评论-->
      <Comment :article-id="articleId" :article-title="articleData.title" />
    </div>
    <Catalog class="article-catalog" :list="articleData.catalog" />
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import Comment from '@/components/Comment'
import { formatComplete } from '@/filters'
import 'highlight.js/styles/atom-one-dark.css' // 代码高亮
import highlight from '@/directives/highlight'

import Catalog from './Catalog'

export default {
  name: 'ArticlePage',
  filters: {
    formatComplete
  },
  directives: {
    highlight
  },
  components: {
    Catalog,
    Comment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      articleData: '',
      prev: '',
      next: ''
    }
  },
  computed: {
    isSmallScreen() {
      return this.$store.getters.isSmallScreen
    }
  },
  watch: {
    articleId: {
      handler() {
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getArticleDetail(this.articleId)
        .then(res => {
          const { detail, prev, next } = res
          this.articleData = detail

          this.prev = prev
          this.next = next
          // 获取评论
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .article {
    padding: 20px 20px;
    text-align: left;
    flex-wrap: nowrap;
    &.smallScreen {
      .article-content {
        margin-left: 100px;
      }
      .article-catalog {
        width: 100px;
      }
    }
    /*主体部分*/
    .article-content {
      overflow: hidden;
      margin-left: 220px;
    }
    .title {
      margin: 20px 0;
      font-size: @font-size-lg;
      font-weight: bold;
    }
    .info {
      padding: 6px;
    }
    .info-row {
      padding: 4px 0;
      color: @color-tint;
    }
    .tags {
      margin-bottom: 10px;
      font-size: @font-size-sm;
      line-height: 1;
      .item-tags {
        display: inline;
        & + .item-tags {
          margin-left: 10px;
        }
      }
      .text {
        display: inline-block;
        vertical-align: top;
        color: @color-link;
        cursor: pointer;
      }
      .icon {
        margin-right: 6px;
      }
    }
    .date {
      float: left;
    }
    .read-count {
      margin-right: 4px;
      float: right;
    }
    .content {
      padding-bottom: 20px;
      border-top: 1px solid @color-border;
      border-bottom: 1px solid @color-border;
    }
    .more {
      margin-top: 10px;
      line-height: 30px;
      .more-item {
        max-width: 48%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .more-prev {
        float: left;
      }
      .more-next {
        float: right;
      }
    }
  }

</style>
