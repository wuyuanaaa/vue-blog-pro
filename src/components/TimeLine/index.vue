<template>
  <div class="timeLine">
    <viewTitle :title-text="title" />
    <div v-for="item of yearsData" :key="item.id" class="year-part clearfix">
      <span class="year-num">{{ item.year }}</span>
      <div class="year-list">
        <div v-for="(innerlist, i) of item.list" :key="i" class="list-item">
          <span class="list-date">{{ innerlist.createdAt | formatMD }}</span>
          <span class="list-title">
            <router-link :to="{name: 'Article', params: {articleId: innerlist.id}}">
              {{ innerlist.title }}
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import viewTitle from '@/components/viewTitle'
import { formatMD } from '@/filters'

export default {
  name: 'TimeLine',
  filters: {
    formatMD
  },
  components: {
    viewTitle
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      yearsData: []
    }
  },
  watch: {
    list: {
      handler() {
        this.yearsData = []
        this.getYearsData()
      }
    }
  },
  methods: {
    getYearsData() {
      const result = {}
      const sortList = [...this.list]
      sortList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      sortList.forEach(current => {
        const year = new Date(current.createdAt).getFullYear()

        result[year] || (result[year] = [])

        result[year].push(current)
      })
      const yearsData = Object.keys(result).map(item => {
        return {
          year: item,
          list: result[item]
        }
      })
      this.yearsData = yearsData.sort((a, b) => b.year - a.year)
    }
  }
}
</script>

<style lang="less" scoped>
  .timeLine {
    .year-part {
      text-align: left;
      .year-num {
        float: left;
        margin: 5px 0 0 2px;
        border-bottom: 2px solid @color-base; /*no*/
        font-size: @font-size-sm;
      }
      .year-list {
        padding: 10px 0;
        margin-left: 80px;
        border-left: 1px dashed @color-border; /*no*/
      }
      .list-item {
        display: flex;
        position: relative;
        padding: 0 0 30px 40px;
        &::before {
          content: '';
          position: absolute;
          top: 2px;
          left: -6.4px;
          width: 12px;
          height: 12px;
          border-radius: 100%;
          background: rgba(79,142,84,0.4);
        }
      }
      .list-date {
        flex: 0 0 60px;
      }
      .list-title {
        flex: 1;
      }
    }
  }
</style>
