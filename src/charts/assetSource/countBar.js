/*
 * @Author: xiexiaoying
 * @Date: 2021-04-01 13:22
 * @Email: 634021337@qq.com
 * @Description:
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-05-07 14:52:26
 */

import echarts from "echarts"
import { mapGetters } from "vuex";
export default {
  template: '<div></div>',
  data() {
    return {
      defaultSetting: {
      },
    }
  },
  props: {
    selector: String,
    sourceData: Object,
    option: Object, // 配置项
  },
  computed: mapGetters({
    isOpenSideMenu: 'isOpenSideMenu'
  }),
  mounted() {
    this.options = _.merge({}, this.defaultSetting, this.option)
    // 初始化图表
    this.myChart = echarts.init(document.querySelector(this.selector))
    this.initChart()
    window.addEventListener('resize', () => {
      if (this.myChart) {
        this.myChart.resize()
      }
    })
  },
  methods: {
    initChart() {
      if(_.isEmpty(this.sourceData)) {
        return 
      } 
      const { xaxis, values } = this.sourceData
      let option = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(129, 143, 180, 0.95)',
        }, 
        grid: {
          left: 60,
          right: 26, 
          bottom: 40,
          top: 50,
        },
        xAxis: {
            type: 'category',
            splitLine: {
              show: false,
            },
            axisTick: { 
              lineStyle: {
                color: 'rgba(129, 143, 180, 0.25)',
              }
            },
            axisLabel: {
              color: '#818FB4'
            },
            axisLine: { 
              lineStyle: {
                color: 'rgba(129, 143, 180, 0.25)',
              }
            },
            data: xaxis
        },
        yAxis: {
            type: 'value',
            name: `百分比`, 
            nameTextStyle: {
              color: '#818FB4',  
              align: 'right'
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#818FB4',
              formatter(val) {
                 return val + '%'
              }
            }, 
            splitLine: {
              lineStyle: {
                color: '#F2F6F9'
              }
            }, 
        },
       
        series: [{
            data: values,
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              color: '#1D84EF'
            } 
        }]
    };
      this.myChart.setOption(option)
    }
  },
  watch: {
    sourceData: 'initChart',
    isOpenSideMenu() {
      setTimeout(() => {
        this.myChart && this.myChart.resize()
      }, 100)
    }
  },
}
