
<template>
  <div class="page-container">
    <timeLine title="归档" :list="articleList" />
  </div>
</template>

<script>
import timeLine from '@/components/TimeLine'
import { getArticleList } from '@/api/article'

export default {
  name: 'Archived',
  components: {
    timeLine
  },
  data() {
    return {
      articleList: []
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      getArticleList()
        .then(res => {
          this.articleList = res
        })
    }
  }
}
</script>

