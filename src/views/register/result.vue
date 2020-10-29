<template>
  <div class="page-container">
    <viewTitle title-text="注册成功" />
    <div class="content">
      <p>🎉感谢你的注册！<b>{{ user.nickname }}</b></p>
      <p>你的账号是 <b>{{ user.username }}</b> ，请妥善保管，因为我还没做密码找回😀</p>
      <p>接下来你可以</p>
      <p class="link-row">
        <router-link class="link" :to="{name: 'Home'}" replace>
          <el-button class="link-btn" type="text">回到首页</el-button>
        </router-link>
        <router-link class="link" :to="{name: 'About'}" replace>
          <el-button class="link-btn" type="text">先看看介绍</el-button>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import viewTitle from '@/components/viewTitle'
import { newUserKey, getStorage } from '@/utils/localStorage'

export default {
  name: 'RegisterResult',
  components: {
    viewTitle
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const user = getStorage(newUserKey)
      if (!user) {
        this.$router.replace({ name: 'Home' })
      } else {
        this.user = user
      }
    }
  }

}
</script>

<style lang="less" scoped>
  .content {
    margin-top: 100px;
    font-size: @font-size-md;
    line-height: 2;
    .link-row {
      margin-top: 40px;
    }
    .link {
      margin: 0 10px;
    }
    .link-btn {
      font-size: @font-size-sm;
    }
  }
</style>
