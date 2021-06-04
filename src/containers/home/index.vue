<template>
  <el-container>
    <el-aside width="240px">
      <NavMenu />  
    </el-aside>
    <el-container>
      <el-header height="60px">
        <PageHeader />  
      </el-header>
      <el-main>
      <router-view :user="user"></router-view>
    </el-main>
    </el-container> 
  </el-container>
</template>

<script>
import NavMenu from '@/components/home/navMenu.vue';
import PageHeader from '@/components/home/pageHeader.vue';

export default {
  data() {
    return {
      user: {
        uid: sessionStorage.getItem('uid'),
        username: sessionStorage.getItem('user'),
      },
    };
  },
  components: {
    NavMenu,
    PageHeader,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  position: fixed;
  left: 240px;
  right: 0;
  padding: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.94);
  // box-shadow: 0 0 2px #eee;
}

.el-main {
  padding: 76px 16px 16px 16px;
  background: #fff;
}
</style>
