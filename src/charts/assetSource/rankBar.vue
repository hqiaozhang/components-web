/*
 * @Author: zhanghongqiao 
 * @Date: 2020-11-19 16:36:18 
 * @Email: 991034150@qq.com 
 * @Description: 柱状图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-04-30 15:43:06
 */

<style lang="scss">
  .station_rank_bar {
    width: 100%;
    font-size: 14px;
    li {
      display: flex;
      margin-bottom: 8px;
      cursor: pointer;
      p {
        margin-bottom: 4px;
        line-height: 18px;
        height: 18px;
        span {
          float: right;
          color: #818FB4;
        }
      }
      div {
        flex: 1;
      }
    }
    li span.num {
      width: 17px;
      height: 17px; 
      border-radius: 2px;
      display: inline-block;
      text-align: center;
      line-height: 16px; 
      margin-right: 8px;
      font-size: 12px; 
      border: 1px solid #C0C7D9; 
    }
    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(3) {
      .num{
        border: none;
        color: #fff;
      }
    }
    li:nth-child(1) .num{
      background: #FF3C4D;
    }
    li:nth-child(2) .num{
      background: #F77B31;
    }
    li:nth-child(3) .num{
      background: #FCCB41;
    }
    .bar_data,
    .bar_bg {
      width: 100%; 
      height: 6px;
      background: #ECEEF4;
      opacity: 1;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }
    .bar_data {
      
      width: 0;
      transition: all 0.2s;
      position: absolute;
      left: 0;
      top: 0;
      &.level1 {
        background: #36D234;
      }
      &.level2 {
        background: #FCCB41;
      }
      
    }
  }
</style>


<template>
  <ul class="station_rank_bar">
    <p class="empty_text" v-if="sourceData.length == 0">暂无数据</p>
    <li v-for="(item, i) in sourceData" :key="item.id"  @click="handleItem(item)">
      <span class="num">{{i+1}}</span>
      <div>
        <p>{{item.name}} <span>{{item.value}}{{util}}</span></p>
        <div class="bar_bg"> 
          <div class="bar_data" :style="{width: item.value / max * 100 + '%'}" :class="'level' + item.level"></div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script> 
export default {
  data() {
    return {
      max: 100,  
    }
  },
  model: {
    event: 'change'
  },
  props: {
    sourceData: Array,
    ptype: String,
    util: String,
  },
  mounted() {
   
    this.findMaxValue(this.sourceData)
  },
  methods: {
    findMaxValue(data) {
      if(_.isEmpty(data)) {
        return
      }
      this.max = data[0].value 
    },
    handleItem(item) {
      this.$emit('change', item)
    }
  },
  watch: {
    sourceData: 'findMaxValue',
  }
}
</script>

