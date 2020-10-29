<template>
  <div class="nav-bar ts" :class="{navShow: isNavShow}">
    <img class="nav-logo" src="../../assets/logo.svg" alt="">
    <div>
      <template v-for="item in routes">
        <navItem v-if="!item.hidden" :key="item.path" :nav="item" />
      </template>
    </div>

    <div
      class="nav-log"
      :class="{'isLogin': isLogin}"
      :title="isLogin?'退出登陆':'登陆'"
      @click="logClick"
    >
      <el-avatar v-if="userInfo.avatar" class="avatar" :src="userInfo.avatar" />
      <el-avatar v-else class="avatar">{{ userInfo.nickname || '空' }}</el-avatar>
      <!-- <img class="avatar" :src="userInfo.avatar||defaultAvatar" alt=""> -->
      <div class="userName">{{ userInfo.nickname || '未登录' }}</div>
    </div>

    <div class="nav-tool">
      <span title="换云" class="tool-item" @click="handleChangeCloud">
        <svg-icon icon-class="cloud" class-name="tool-icon" />
      </span>
    </div>

    <!--退出登陆模态框-->
    <Dialog
      :visible="logoutModal"
      title="操作提示"
      @confirm="logoutModalOk"
      @cancel="logoutModalCancel"
    >
      <p>确定要退出登陆？</p>
    </Dialog>

    <div class="nav-menu ts" @click.stop="showNav">
      <img v-if="isNavShow" class="nav-menu-img" src="../../assets/bird-active.png" alt="">
      <img v-else class="nav-menu-img" src="../../assets/bird.png" alt="">
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog'
import navItem from './navItem'
import { mapGetters } from 'vuex'

export default {
  name: 'UserNav',
  components: {
    navItem,
    Dialog
  },
  data() {
    return {
      showMore: false,
      isBackTopShow: false,
      defaultAvatar: 'https://i.loli.net/2019/04/17/5cb69f3a9606f.jpg',
      logoutModal: false,
      routes: this.$router.options.routes[0].children
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'isNavShow',
      'userInfo'
    ])
  },
  watch: {
    'isLogin': {
      immediate: true,
      handler(val) {
        if (val && !this.userInfo.id) {
          this.getUserInfo()
        }
      }
    }
  },
  mounted() {
    window.addEventListener('storage', this.handleStorageListener)
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageListener)
  },
  methods: {
    showNav() {
      this.$store.dispatch('app/updateIsNavShow', !this.isNavShow)
    },
    // 登陆部分点击事件 未登陆则去登陆 已登陆则响应登出
    logClick() {
      this.isLogin ? this.handleLogout() : this.$store.dispatch('app/updateIsLoginDialogShow', true)
    },
    handleLogout() {
      this.logoutModal = true
    },
    logoutModalOk() {
      this.logoutModal = false
      this.$store.dispatch('user/logout')

      this.$Message.success('登出成功!')
    },
    logoutModalCancel() {
      this.logoutModal = false
    },
    getUserInfo() {
      this.$store.dispatch('user/getUserInfo')
        .then(() => {
          this.$Message.success(`${this.userInfo.nickname}，欢迎!`)
        })
    },
    handleStorageListener({ key, newValue }) {
      if (key !== '_login' || !newValue) {
        return
      }
      const { data } = JSON.parse(newValue)

      if (!data) {
        this.$Message.error('githib 登陆失败！请稍后再次尝试')
      } else {
        this.$store.dispatch('user/githubLogin', data)
          .then(() => {
            this.$Message.success(`${data.userInfo.nickname}，欢迎!`)
            this.$store.dispatch('app/updateIsLoginDialogShow', false)
          })
      }
      window.localStorage.removeItem('_login')
    },
    handleChangeCloud() {
      this.$emit('changeCloud')
    }
  }
}
</script>
<style lang="less" scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    right: -@side-width;
    padding: 40px 0;
    width: @side-width;
    height: 100%;
    background: rgba(240, 240, 240, 0.7);
    &.navShow {
      right: 0;
    }

    .nav-logo {
      margin-bottom: 20px;
      width: 40px;
      height: 40px;
    }

    .nav-menu {
      cursor: pointer;
      position: absolute;
      top: 20px;
      left: -50px;
      width: 50px;
      height: 40px;
      line-height: 36px;
      border-bottom: 2px solid #141818; /*no*/
      .nav-menu-img {
        height: 100%;
        margin-top: 4px;
      }
    }

    .nav-log {
      position: absolute;
      bottom: 50px;
      width: 100%;
      text-align: center;
      cursor: pointer;
      .avatar {
        margin-bottom: 6px;
      }
      .userName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        color: @color-tint;
      }
    }
    .isLogin {
      .userName {
        color: @color-main;
      }
    }

    .nav-tool {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      .tool-item {
        padding: 4px;
        cursor: pointer;
        &:hover {
          color: @color-cloud;
        }
      }
    }

  }
</style>
