<template>
   <div class="panel">
     <div class="title" v-if="panelKey === 'layers'">
       <span>图层</span>
     </div>
     <div v-else-if="panelKey !== ''" class="title">
       <span>{{componentList[panelKey].name}} ({{componentList[panelKey].children.length}})</span>
     </div> 
     <div class="layer_list" v-if="panelKey === 'layers'">
       <draggable  v-model="chartData.elements"
        @start="handleLayerListDragStart"
        @end="handleLayerListDragEnd"
        ghost-class="ghost">
         <transition-group type="transition" :name="!drag ? 'flip-list' : null">
           <div class="list_item"  v-for="(item, index) in chartData.elements"
            :key="item.name"
            @click="$parent.$parent.setActiveComponentByIndex(index)"
            :class="{active: index === $parent.$parent.currentElementIndex}">
               <div class="name">{{item.name}}</div>
               <i class="el-icon-delete icon" @click="handleDeleteComponent(index)"></i>
           </div>
         </transition-group>
       </draggable>
     </div>

     <div class="component_list" v-else-if="panelKey !== ''">
        <draggable  v-model="componentList[panelKey].children"
          @start="move"
          @end="handleAddComponent">
          <!--  @click="handleAddComponent(item)" -->
            <div class="list_item" v-for="(item, i) in componentList[panelKey].children" :key="i" :index="i"
             >
              <div class="img_wrapper">
                <img :src="item.img" /> 
              </div>
              <div class="name">{{item.name}}</div>
            </div>
          </draggable>   
     </div>
   </div>
</template>

<script>
import draggable from 'vuedraggable';
/* eslint-disable */

export default {
  props: ["panelKey"],
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      nodeMenu: {},
      componentList: {
        chart: {
          name: "图表",
          children: [
            {
              id: "line",
              name: "折线图",
              img: 'static/images/charts/line.png'
            },
            {
              id: "histogram",
              name: "柱状图",
              img: 'static/images/charts/histogram.png'
            },
            {
              id: "bar",
              name: "条形图",
              img: 'static/images/charts/bar.png'
            },
            {
              id: "pie",
              name: "饼图",
              img: 'static/images/charts/pie.png'
            },
            {
              id: "ring",
              name: "环状图",
              img: 'static/images/charts/ring.png'
            },
            {
              id: "funnel",
              name: "漏斗图",
              img: 'static/images/charts/funnel.png'
            },
            {
              id: "radar",
              name: "雷达图",
              img: 'static/images/charts/radar.png'
            }, 
            {
              id: "map",
              name: "中国地图",
              img: 'static/images/charts/map-china.png'
            }, 
            {
              id: "liquidfill",
              name: "水球图",
              img: 'static/images/charts/liquidfill.png'
            },
           
          ]
        },
        text: {
          name: "文本",
          children: [
            {
              id: "text",
              name: "文本",
              img: 'static/images/charts/text.png'
            }
          ]
        },
        picture: {
          name: "图片",
          children: [
            {
              id: "image",
              name: "自定义图片",
              type: 'custom',
              img: 'static/images/charts/image.png'
            }, 
            {
              id: "image",
              name: "水位",
              img: 'static/images/tools/1.png'
            },{
              id: "image",
              name: "水位",
              img: 'static/images/tools/2.png'
            },{
              id: "image",
              name: "凝汽器",
              img: 'static/images/tools/3.png'
            }
          ]
        },
        tools: {
          name: "组件",
          children: [
            {
              id: "border",
              name: "边框",
              img: 'static/images/charts/border.png'
            }
          ]
        }
      },
      layerList: []
    };
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    }
  },
  methods: {
    handleLayerListDragStart(e) {
      this.drag = true;
      this.$parent.$parent.setActiveComponentByIndex(e.oldIndex);
    },
    handleLayerListDragEnd(e) {
      this.drag = false;
      this.$parent.$parent.setActiveComponentByIndex(e.newIndex);
    },
     // 拖拽开始时触发
    move(evt, a, b, c) {  
      var index = evt.item.attributes.index.nodeValue;
      this.nodeMenu = this.componentList[this.panelKey].children[index]
    },

    handleAddComponent(evt) { 
      let item = this.nodeMenu
      let initData = {};
      if (item.id == 'text') {
        initData = {
          type: "text",
          datacon: {
            text: '请输入文字',
            color: '#000000',
            fontSize: 48,
            fontFamily: 'ZCOOL QingKe HuangYou',
            bold: false,
            italic: false,
            stroke: false,
            strokeColor: '#ffffff',
            strokeSize: 2,
            shadow: false,
            shadowColor: '#ff0000',
            shadowBlur: 10,
          }
        };
      } else if (item.id == 'image') {
        initData = {
          type: "image",
          datacon: {
            repeat: 'no-repeat', 
            img: item.type == 'custom' ? '' : item.img,
            type: item.type,
            imgSize: 'contain',
            opacity: 1,
          }
        };
      } else if (item.id == 'border') {
        initData = {
          type: "border",
          datacon: {
            borderId: 1,
            opacity: 1,
          }
        };
      } else {
        initData = {
          type: "chart",
          settings: {
            type: item.id,
          },
          datacon: {
            type: 'raw',
            connectId: '',
            data: {
              columns: ["日期", "访问用户"],
              rows: [
                { 日期: "1月1日", 访问用户: 1523 },
                { 日期: "1月2日", 访问用户: 1223 },
                { 日期: "1月3日", 访问用户: 2123 },
                { 日期: "1月4日", 访问用户: 4123 },
                { 日期: "1月5日", 访问用户: 3123 },
                { 日期: "1月6日", 访问用户: 7123 }
              ]
            },
            getUrl: '',
            interval: 2,
          },
          generated: {
            columns: ["日期", "访问用户"],
            rows: [
              { 日期: "1月1日", 访问用户: 1523 },
              { 日期: "1月2日", 访问用户: 1223 },
              { 日期: "1月3日", 访问用户: 2123 },
              { 日期: "1月4日", 访问用户: 4123 },
              { 日期: "1月5日", 访问用户: 3123 },
              { 日期: "1月6日", 访问用户: 7123 }
            ]
          }
        };
      } 
      let len = this.chartData.elements.length
      const component = { 
        name: "新建图层" + (len + 1),
        index: len,
        x: 10,
        y: 10,
        w: 400,
        h: 200,
        bgcolor: "rgba(0, 0, 0, 0)",
        active: false,
        data: initData
      };
      this.$parent.$parent.addComponent(evt, component);
    },
    handleDeleteComponent(index) {
      this.$parent.$parent.deleteComponent(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  height: 100%;
  // width: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 4px 0 4px #00000005;
}
.title {
  color: #999999;
  padding: 10px 16px 16px;
}
.component_list {
  flex: 1;
  padding: 0 10px 0 16px;
  overflow: scroll;

  .list_item {
    display: inline-block;
    min-width: 100px;
    background: rgba(64, 160, 255, 0.06);
    border: 1px solid rgba(64, 160, 255, 0.1);
    margin-right: 10px;
    margin-bottom: 12px;
    opacity: 0.6;
    transition: opacity, background 0.3s ease;
    text-align: center;
    padding: 5px 0;

    &:hover {
      // cursor: pointer;
      cursor: move;
      opacity: 0.8;
      background: rgba(64, 160, 255, 0.1);
      border: 1px solid #409eff;
      .name {
        color: #666666;
      }
    }

    .img_wrapper {
      display: flex;
      width: 100%;
      height: 80px;
      align-items: center;
      justify-content: center;
      img {
        height: 54px;
      }
    }

    .name {
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: #777777;
    }
  }
}

.flip_list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}

.layer_list {
  flex: 1;
  padding: 0;
  overflow: scroll;

  .list_item {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    transition: background 0.3s ease;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    border-right: 6px solid transparent;
    margin-bottom: -1px;
    padding: 0 16px;
    box-sizing: border-box;

    &.active {
      background: rgba(64, 160, 255, 0.06);
      border-right: 6px solid #409eff7d;
    }

    &:hover {
      opacity: 1;
      background: rgba(64, 160, 255, 0.06);

      .icon {
        opacity: 1;
      }
    }

    .name {
      flex: 1;
      color: #777777;
    }

    .icon {
      float: right;
      color: #999999;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
