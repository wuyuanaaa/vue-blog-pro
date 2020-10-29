<template>
  <div class="page-container">
    <timeLine :title="detail.tagName" :list="detail.articles" />
  </div>
</template>

<script>
import timeLine from '@/components/TimeLine'
import { getTagDetail } from '@/api/tag'

export default {
  name: 'Tag',
  components: {
    timeLine
  },
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      detail: []
    }
  },
  watch: {
    tag: {
      immediate: true,
      handler() {
        this.fetchList()
      }
    }
  },
  methods: {
    fetchList() {
      getTagDetail(this.tag).then(res => {
        this.detail = res
      })
    }
  }
}
</script>

