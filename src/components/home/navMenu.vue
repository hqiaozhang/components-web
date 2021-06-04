<template>
  <div class="sidebar">
    <div class="logo">
      <!-- <img src="static/images/logo2.png"> -->
      <router-link to="/"> <img src="static/images/logo2.png"> </router-link>
    </div>
    <router-link class="sidebar-item" v-for="item in menuList"
      :key="item.name"
      :class="{ active: routePath == item.path }"
      :to="item.path">
      <i :class="item.icon"></i>
      <span>{{item.name}}</span>
    </router-link>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: '数据管理',
          icon: 'el-icon-menu',
          path: '/home/data',
        }, {
          name: '我的可视化',
          icon: 'el-icon-document',
          path: '/home/chart',
        },
      ],
    };
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
  },
  mounted() {
    // this.routePath = this.$route.path;
  },
  methods: {
    goPath(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background:#F2F6F9;
  z-index: 20;

  .logo {
    height: 30px; 
    text-align: center; 
    padding: 10px 0;
    border-bottom: 1px solid #eee; 
    cursor: pointer;
    // background: #1D84EF;
    img {
      // width: 100%;
      height: 100%;
    } 
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    height: 36px;
    margin: 8px 48px 8px 24px;
    padding: 0 16px;
    font-size: 14px;
    color: #808080;
    border-radius: 8px;
    text-decoration: none;

    &.active {
      color: #222222;
      background: rgba(0, 0, 0, 0.06);
    }

    i {
      font-size: 16px;
      margin-right: 8px;
    }

    &:hover {
      color: #333;
    }
  }
}
</style>
