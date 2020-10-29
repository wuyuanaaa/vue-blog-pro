<template>
  <div class="wrap">
    <Cloud ref="cloud" />
    <div ref="userBase" class="userBase ts" :class="{'navShow': isNavShow}">
      <transition name="fade-header">
        <Header v-if="showHeader" />
      </transition>
      <div class="userBase-content ts" @click="contentClick">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cacheList">
            <router-view />
          </keep-alive>
        </transition>
        <div class="footer">
          <Footer />
          <backTop />
        </div>
      </div>
      <navBar @changeCloud="handlerChanegCloud" />

      <!--登陆模态框-->
      <transition name="el-zoom-in-center">
        <Login v-if="isLogiDialogShow" />
      </transition>

    </div>
  </div>

</template>

<script>
import navBar from './components/nav'
import Header from './components/header'
import Footer from './components/footer'
import backTop from './components/backTop'
import Cloud from '@/components/Cloud'
import Login from '@/components/Login'

import { mapGetters } from 'vuex'

export default {
  name: 'UserBase',
  components: {
    navBar,
    Header,
    Footer,
    backTop,
    Cloud,
    Login
  },
  data() {
    return {
      isSmallScreen: ''
    }
  },
  computed: {
    ...mapGetters(['isNavShow', 'isLogiDialogShow', 'cacheList']),
    showHeader() {
      return this.$route.meta.showHeader
    }
  },
  watch: {
    isSmallScreen: {
      handler(newVal) {
        this.$store.dispatch('app/updateIsNavShow', !newVal)
        this.$store.dispatch('app/updateIsSmallScreen', newVal)
      }
    }
  },
  mounted() {
    this.checkInnerWidth()
    window.addEventListener('resize', this.checkInnerWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkInnerWidth)
  },
  methods: {
    checkInnerWidth() {
      const innerWidth = window.innerWidth
      this.isSmallScreen = innerWidth < 992
    },
    contentClick() {
      this.isSmallScreen && (this.$store.dispatch('app/updateIsNavShow', false))
    },
    handlerChanegCloud() {
      this.$refs.cloud.update()
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
}
.userBase {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  /* &.navShow {
    padding-right: @side-width;
  } */
}
.userBase-content {
  margin: 0 auto;
  position: relative;
  max-width: @content-max-Width;
  min-height: 100%;
  padding-bottom: @footer-height;
  // overflow: hidden;
  background: rgba(255,255,255,0.5);
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
