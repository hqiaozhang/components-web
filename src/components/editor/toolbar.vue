<template> 
  <div class="toolbar">
    <div class="toolbox">
      <div class="tool_list">
        <div class="btn"  v-for="item in btnList" 
        :class="{active: panelKey === item.key}" 
        :key="item.key"
          @click="showPanel(item.key)">
           <i class="iconfont" v-html="item.icon"></i>
          </div>
      </div> 
      <div class="btn" :class="{active: panelKey === 'layers'}" @click="showPanel('layers')">
        <i class="iconfont icon-layer"></i>  
      </div>   
    </div>

    <div class="collapse_panel" v-show="panelKey">
      <SidePanel :panelKey="panelKey"></SidePanel>
    </div>
  </div> 
</template>

<script>
import SidePanel from './sidePanel.vue';

export default {
  components: {
    SidePanel,
  },
  data() {
    return {
      panelKey: '',
      btnList: [ 
        {
          key: 'chart',
          icon: '&#xe647;',
          name: '图表',
        }, {
           key: 'text',
          icon: '&#xe600;',
          name: '文字',
        }, {
          key: 'picture',
          icon: '&#xe766;',
          name: '图片',
        }, {
          key: 'tools',
          icon: '&#xe603;',
          name: '组件',
        },
      ],
      showCollapsePanel: false,
    };
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
  },
  methods: {
    showPanel(key) {
      if (this.panelKey === key) {
        this.panelKey = '';
      } else {
        this.panelKey = key;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 100%;
}

.toolbox {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.02);

  .tool_list {
    flex: 1;
    margin-top: 4px;
  }

  .btn {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 5px;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #999;
    &:hover {
      cursor: pointer;
      background-color: rgba(64, 160, 255, 0.1);
      color: #666666;
    }
    &.active {
      background-color: rgba(64, 160, 255, 0.1);
      color: #409EFF;
    }
    .iconfont {
      font-size: 18px;
    }
  }
}

.collapse_panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 250px;
  // max-width: 250px;
  z-index: 10;
}
</style>
