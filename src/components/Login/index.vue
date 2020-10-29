<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2 class="login-title">后台登陆</h2>
      <el-form
        ref="form"
        class="login-form"
        :model="formData"
        :rules="rules"
        label-width="auto"
        label-suffix="："
        :hide-required-asterisk="true"
      >
        <p class="form-label">用户名</p>
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="formData.username"
            class="form-input"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <p class="form-label">密码</p>
          <el-tooltip v-model="capsTooltip" content="大小写锁定已打开" placement="right" manual>
            <el-input
              ref="password"
              v-model="formData.password"
              class="form-input"
              type="password"
              show-password
              clearable
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
          </el-tooltip>
        </el-form-item>

      </el-form>
      <el-button
        type="primary"
        class="login-submit"
        :loading="loading"
        @click="handleLogin"
      >登 陆</el-button>
      <div class="other">
        <el-button type="text" @click="handleRegister">快速注册</el-button>
        <span class="or">or</span>
        <el-button type="text" @click="handleGithubLogin">Github 登陆</el-button>
      </div>
    </div>
    <div class="login-close">
      <el-button class="close-btn" icon="el-icon-close" circle @click="handleClose" />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trgger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trgger: 'change' }
        ]
      },
      capsTooltip: false
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    handleLogin() {
      this.loading = true
      this.$refs['form'].validate()
        .then(() => {
          return this.$store.dispatch('user/login', this.formData)
        })
        .then(res => {
          this.$store.dispatch('app/updateIsLoginDialogShow', false)
        })
        .catch(e => {
          console.log('login err', e)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleClose() {
      this.$store.dispatch('app/updateIsLoginDialogShow', false)
    },
    handleRegister() {
      this.$store.dispatch('app/updateIsLoginDialogShow', false)
      this.$router.push({ name: 'Register' })
    },
    handleGithubLogin() {
      window.open(
        'https://github.com/login/oauth/authorize?client_id=3cac26e3df8c67028724&scope=user:email',
        'oauthPage',
        'height=500,width=600'
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .login-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background: rgba(255,255,255,0.4);
  }
  .login-container {
    padding: 50px 100px 50px;
    width: 420px;
    background: rgba(255,255,255,0.8);
    animation: Bubble 20s linear infinite alternate;
    box-shadow: 0 0 14px rgba(195, 171, 159, 0.8);
    text-shadow: 0 0 14px rgba(255, 225, 210, 0.8);
    letter-spacing: 0.15em;
    .login-title {
      text-align: center;
      margin-bottom: 40px;

    }
    .login-submit {
      margin-top: 20px;
      width: 100%;
      background: #000;
      border-color: rgb(0, 119, 109);
      &:active {
        transform: scale(0.9);
      }
    }

    .other {
      margin-top: 10px;
      .or {
        margin: 0 1em;
      }
    }
  }

  @keyframes Bubble {
    0% {
      border-radius: 52% 73% 56% 70%;
    }
    20% {
      border-radius: 71% 67% 78% 62%;
    }
    40% {
      border-radius: 45% 70% 50% 70%;
    }
    60% {
      border-radius: 62% 54% 67% 54%;
    }
    80% {
      border-radius: 51% 67% 55% 65%;
    }
    100% {
      border-radius: 73% 52% 67% 52%;
    }
  }

  .login-form {
    .form-label {
      margin: 0.5em 0;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .login-close {
    position: absolute;
    bottom: 20px;
    .close-btn {
      background: #333;
      color: #fff;
      &:hover {
        background: @color-base;
      }
    }
  }
</style>
