<template>
  <div class="articleList">
    <router-link
      v-for="(item, index) in list"
      :key="index"
      class="list-item"
      tag="div"
      :to="{name: 'Article', params: {articleId: item.id}}"
    >
      <div class="item-title">
        <span class="link">{{ item.title }}</span>
      </div>

      <div class="item-info">
        <span class="item-info-date">{{ item.createdAt | formatYMD }}</span>
        <span v-for="(tag, i) in item.tags" :key="tag.id">
          <router-link class="item-info-tag link" :to="{name: 'Tag', params: {tag: tag.id}}">
            {{ tag.tagName }}
          </router-link>
          <span v-if="i!==item.tags.length-1">/</span>
        </span>
      </div>

      <div class="item-info">
        <svg-icon icon-class="comment" class-name="icon" />
        <span class="text">{{ item.comments }}</span>

        <svg-icon icon-class="read" class-name="icon" />
        <span class="text">{{ item.reading }}</span>
      </div>

    </router-link>

    <div class="load-info">
      <p v-if="loading">加载中...</p>
      <p v-else>{{ hasMore ? '好像有点问题...' : '只有这么多了...' }}</p>
    </div>
  </div>
</template>

<script>
import { getArticlePage } from '@/api/article'
import { formatYMD } from '@/filters'
// import { debounce } from '@/utils'

export default {
  name: 'Home',
  filters: {
    formatYMD
  },
  data() {
    return {
      msg: '树苗种植中...',
      list: [],
      page: 1,
      pageSize: 10,
      loading: true,
      hasMore: true
    }
  },
  mounted() {
    this.fetchArticlesList()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    fetchArticlesList() {
      const param = {
        page: this.page,
        pageSize: this.pageSize
      }

      this.loading = true

      getArticlePage(param)
        .then(res => {
          const list = res.list
          // 更新页面数据
          this.list = [...this.list, ...list]
          // 检查是否全部加载完
          this.hasMore = this.page < res.pages
        })
        .catch((e) => {
          console.log('getArticlesList err')
        })
        .finally(() => {
          this.loading = false
        })
    },
    onScroll() {
      if (this.loading || !this.hasMore) {
        return
      }
      const pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const innerHeight = window.innerHeight || document.documentElement.clientHeight
      if (pageHeight - (scrollTop + innerHeight) < 60) {
        this.page++
        this.fetchArticlesList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .list-item {
    display: block;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    letter-spacing: 0.04em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /*no*/
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .item-title {
    margin-bottom: 20px;
    font-size: @font-size-md;
    font-weight: bold;
    color: @color-main;
  }

  .item-info {
    margin-top: 10px;
    text-align: center;
    line-height: 1.2em;
    vertical-align: middle;
    color: @color-tint;
    .icon {
      position: relative;
      // bottom: -1px;
      margin-right: 6px;
      margin-left: 12px;
      font-size: 16px;
    }
    .icon-read {
      margin-top: -3px;
      font-size: 20px;
    }
  }

  .item-info-tag {
    margin: 0 0.5em;
    cursor: pointer;
    color: #c3b74e;
  }

  .load-info {
    margin: 10px 0;
    font-size: @font-size-xs;
    color: @color-tint;
  }
</style>
