<template>
  <div class="login-page" :style="{height: `${domH}px`}">
    <div id="page-container" class="page-posi">
      <div class="login-vision"></div>
      <div class="p_title">
        <i class="line"></i><h2>数据融合服务平台</h2> <i class="line line1"></i>
      </div>
      <!-- begin login -->
      <div class="login animated fadeInDown">
          <!-- end brand -->
          <div class="login-content">
            <form @submit.prevent="submit" name="loginForm" id="loginForm" class="margin-bottom-0">
              <div class="form-group ibg1">
                <input type="text" @input="getUsername" :value="username" name="username" placeholder="账户"/>
              </div>
              <div class="form-group ibg2">
                <input type="password" @input="getPassword" name="password" placeholder="密码"/>
              </div>
              <div class="login-buttons">
                <input type="submit" class="btn btn-success btn-block btn-sm" value="登录"/>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./index.scss"
  import {mapGetters} from "vuex"
  import {fetch} from '@/utils/request'
  import {getCookie, setCookie, messagePopup} from '@/utils/util'
  import config from '@/config/base.config'

  let host = config.proxyHost

  export default {
    data() {
      return {
        domH: window.innerHeight,
        inputtext: {},
        host: host,
        username: '', // 用户名
        password: '', // 密码
        code: '', // 验证码
        loading: '', // 加载中提示
        redirect: undefined,
        otherQuery: {},
        sessionStorageArray: ['topActiveId', 'isClickkTop', 'haveSideMenu', 'leftActiveId']
      }
    },
    props: {
      requestChangePwd: Function
    },
    components: {},
    mounted() {
      setCookie('df_user_id', '')
      setCookie('df_user_name', '')
      window.addEventListener('resize', () => {
        this.domH = window.innerHeight
      })

       this.sessionStorageArray.map(val => { 
        sessionStorage.removeItem(val);
      })
    },
    methods: {
      submit() {
        // 验证判断
        if (this.validateForm() == true) {
          this.loading = this.$loading({
            text: '正在登录',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          // 获取参数
          let params = {
            username: this.username,
            password: this.password,
          }
          fetch('fetchLogin', params, (data) => {
            this.loading.close() // 关闭加载中
            if (data.successful) {
              // this.$router.push('/index')
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              // 登录成功(状态设置)
              this.$store.commit('setLoginState', false)

            } else {
              messagePopup(data.error, 'error')
            }
          })
        }
      },
      /*
       * 验证表单字段是否为空
       */
      validateForm() {
        const {username, password} = this
        // 用户名验证
        if (_.isEmpty(username)) {
          messagePopup('用户名不能为空 !')
          return false
        }
        // 密码验证
        if (_.isEmpty(password)) {
          messagePopup('密码不能为空 !')
          return false
        }

        return true
      },
      /** 用户名*/
      getUsername(e) {
        this.username = e.target.value
      },
      /** 用户名密码 */
      getPassword(e) {
        this.password = e.target.value
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }

    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    }
  };
</script>




