<template>
  <div class="catalog">
    <div class="catalog-title">目录</div>
    <div class="catalog-list">
      <a
        v-for="(item, index) in list"
        :key="index"
        class="list-item"
        :data-lev="item.lev"
        :href="'#'+item.label"
        :title="item.heading"
      >
        {{ item.heading }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }

}
</script>

<style lang="less" scoped>
  .catalog {
    position: fixed;
    top: 60px;
    // left: 10px;
    width: 200px;
    .catalog-title {
      margin-bottom: 10px;
      color: @color-tint;
      font-size: @font-size-md;
      font-weight: bold;
    }
    .list-item {
      display: block;
      line-height: 2;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: @color-base;
      &:hover {
        background-color: rgba(0,0,0,0.06);
      }
      &[data-lev='2'] {
        padding-left: 4px;
        font-weight: bold;
      }
      &[data-lev='3'] {
        padding-left: 10px;
        font-weight: bold;
      }
      &[data-lev='4'] {
        padding-left: 16px;
      }
      &[data-lev='5'] {
        padding-left: 22px;
      }
    }
  }
</style>
