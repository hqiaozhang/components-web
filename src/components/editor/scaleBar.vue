<template lang="pug">
  <div class="panel">
    <div class="control_bar">
      <i class="btn el-icon-minus" @click="zoomOut"></i>
      <div class="scale_mount">{{scale * 100}}%</div>
      <i class="btn el-icon-plus" @click="zoomIn"></i>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      scale: 0.7,
    };
  },
  watch: {
    scale(val) {
      console.log(val)
      this.$emit('update:scale', val);
    },
  },
  methods: {
    zoomOut() {
      if (this.scale > 0.1) {
        this.scale = parseFloat((this.scale - 0.1).toFixed(1));
      }
    },
    zoomIn() {
      if (this.scale < 1) {
        this.scale = parseFloat((this.scale + 0.1).toFixed(1));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  width: 130px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #cccccc;
}

.control_bar {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  height: 32px;
  color: #666666;
  padding: 0 6px;

  .btn {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    font-size: 12px;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #dddddd;
      color: #333333;
    }
  }

  .scale_mount {
    flex: 1;
    font-size: 14px;
  }
}

.canvas_view {
  position: relative;
  background: #1e1e1ee9;
  width: 144px;
  margin: 6px 8px;
  height: 120px;
}

.canvas_box {
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
}

.canvas-box-dragging, .canvas-box-dragging:hover {
  background: rgba(255, 255, 255, 0.16);
}
</style>
