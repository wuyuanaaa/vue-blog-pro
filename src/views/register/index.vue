<template>
  <div class="page-container register-container">
    <viewTitle title-text="快速注册" />
    <el-form ref="form" :model="formData" :rules="rules" label-width="auto" label-suffix="：" class="register-form" size="medium">
      <el-form-item label="用户名" prop="username">
        <el-popover
          placement="bottom"
          width="200"
          trigger="focus"
          content="字母开头，【大小写字母 数字 - _ @】 组成的 6 到 18 位字符"
        >
          <el-input slot="reference" v-model="formData.username" />
        </el-popover>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-popover
          placement="bottom"
          width="200"
          trigger="focus"
          content="12 位字符以内，汉字字母都算 1 位"
        >
          <el-input slot="reference" v-model="formData.nickname" />
        </el-popover>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-popover
          placement="bottom"
          width="200"
          trigger="focus"
          content="【大小写字母 数字 ! @ # $ % ^ & * - _】 组成的 6 到 18 位字符"
        >
          <el-input slot="reference" v-model="formData.password" show-password />
        </el-popover>
      </el-form-item>
      <el-form-item label="重复密码" prop="checkPassword">
        <el-input v-model="formData.checkPassword" show-password />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="formData.code">
          <el-button
            slot="append"
            class="code-btn"
            icon="el-icon-s-promotion"
            :disabled="waitTime > 0"
            @click="handleSendCode"
          >{{ waitTime > 0 ? `${waitTime}s` : '发送' }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import viewTitle from '@/components/viewTitle'
import { sendCodeEmail, register } from '@/api/user'

import { setToken, encryption } from '@/utils/auth'
import { newUserKey, setStorage } from '@/utils/localStorage'

export default {
  name: 'Register',
  components: {
    viewTitle
  },
  data() {
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次输一次密码呗！'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次密码不一样!'))
      } else {
        callback()
      }
    }
    return {
      popover: '',
      formData: {
        username: '',
        nickname: '',
        password: '',
        checkPassword: '',
        email: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名必填呀！', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9-_@]{5,17}$/, message: '用户名格式错啦！', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称也必填！', trigger: 'blur' },
          { max: 12, message: '昵称也太长了吧！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必须要！', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9!@#$%^&*-_]{6,18}$/, message: '密码格式错啦！', trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '需要邮箱拿验证码！', trigger: 'blur' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱应该填错了吧！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '你的验证码呢？', trigger: 'blur' }
        ]
      },
      waitTime: 0,
      timer: null
    }
  },
  methods: {
    handleSendCode() {
      this.$refs.form.validateField('email', (err) => {
        if (err) return
        sendCodeEmail(this.formData.email)
          .then(() => {
            this.$Message.success('邮件已发送！请注意查收。')
            this.setWait()
          })
      })
    },
    setWait() {
      this.waitTime = 60
      const updateWait = () => {
        this.waitTime--
        if (this.waitTime > 0) {
          this.timer = setTimeout(updateWait, 1000)
        } else {
          clearTimeout(this.timer)
          this.timer = null
        }
      }
      this.timer = setTimeout(updateWait, 1000)
    },
    handleSubmit() {
      this.$refs.form.validate()
        .then(() => {
          const data = encryption({
            data: this.formData,
            param: ['password']
          })
          return register(data)
        })
        .then(({
          username,
          nickname,
          token
        }) => {
          setStorage(newUserKey, {
            username,
            nickname
          }, {
            m: 5
          })
          setToken(token)
          this.$store.dispatch('user/updateIsLogin', true)
          this.$router.replace({
            name: 'RegisterResult'
          })
        })
    }
  }

}
</script>

<style lang="less" scoped>

.register-container {
  .register-form {
    margin: 40px auto 0;
    width: 360px;
  }

  .code-btn {
    color: @color-base;
    &:hover {
      box-shadow: 0 0 10px @color-shadow;
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
    &.is-disabled {
      color: @color-tint;
    }
  }
}

</style>

<style lang="less">

.register-container {
  .el-form-item {
    margin-bottom: 30px;
  }
  .el-form-item__label {
    font-weight: bold;
    color: @color-base;
  }
}

</style>
