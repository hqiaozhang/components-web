<template>
  <div class="header">
    <div class="logo" @click="handleLogo"> 
        <img src="static/images/logo.png"> 
    </div>
    <div class="filename">{{$parent.title}} </div>
    <!-- <div class="publish_btn" @click="$parent.preview = !$parent.preview">预览</div> -->
    <el-tooltip popper-class="title_tooltip"  content="预览" placement="top-start" effect="light">
      <i class="btn iconfont icon-preview"  :class="{active: $parent.preview}" @click="$parent.preview = !$parent.preview"></i>
    </el-tooltip>
    <div class="publish_btn" @click="saveChartData">发布</div>
  </div> 
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title;
    },
  },
  methods: {
    handleLogo() {
       this.$router.push('/home');
    },
    saveChartData() {
      this.$parent.saveChartData();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  background:#1D84EF;
  padding: 0 20px;
  color: #fff;
  cursor: pointer;
}
.logo {
     
  background-size: 100% 100%;
  height: 48px; 
  img {
    height: 100%;
  }
}
.filename {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
}

.btn {
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-right: 8px;
  text-align: center;
  border-radius: 18px;
  transition: all 0.3s ease;
  color: #fff;
  cursor: pointer;
  &.iconfont {
    font-size: 20px;
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.1); 
  }
}

.publish_btn {
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  cursor: pointer;
  // background: #fff;
  // border-radius: 18px;
  padding: 0 18px;
  font-size: 16px;
  transition: all 0.3s ease; 
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
}
</style>
