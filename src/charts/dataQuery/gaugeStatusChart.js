/*
 * @Author: xiexiaoying
 * @Date: 2021-04-01 13:22
 * @Email: 634021337@qq.com
 * @Description:
 * @Last Modified by: xiexiaoying
 * @Last Modified time: 2021-04-01 13:22
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
    sourceData: Number,
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
      let  aqi2 = this.sourceData;
      let dataArr  = !aqi2 ? 0 : (Math.round((aqi2 / 100) * 100) / 100 * 10) / 10;
      let option = {
        backgroundColor: "#fff",
        series: [{
          name: '刻度',
          type: 'gauge',
          radius: '88%',
          min: 0,
          max: 1000,
          splitNumber: 15, //刻度数量
          startAngle: 205,
          endAngle: -25,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [
                [1, 'rgba(0,0,0,0)']
              ]
            }
          }, //仪表盘轴线
          axisLabel: {
            show: false
          }, //刻度标签。
          axisTick: {
            show: true,
            lineStyle: {
              color: '#99C7F8',
              width: 1
            },
            length: -6
          }, //刻度样式
          splitLine: {
            show: false,
          }, //分隔线样式
          pointer: {
            show: false
          }
        },
          {
            type: 'gauge',
            radius: '80%',
            center: ['50%', '50%'],
            splitNumber: 0, //刻度数量
            startAngle: 205,
            endAngle: -25,
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
                color: [
                  [
                    dataArr, '#1D84EF'
                  ],
                  [
                    1, '#F0F0F0'
                  ]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, '-10%'], // x, y，单位px
              textStyle: {
                color: 'rgba(0,0,0,0.45)',
                fontSize: 20
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, '45%'],
              color: '#1D84EF',
              formatter: function(params) {
                if (params == 0) {
                  return params
                }
                return params + '%'
              },
              textStyle: {
                fontSize: 36,
                fontWeight: 500
              }
            },
            data: [{
              name: "已提交",
              value: aqi2 ? aqi2 : 0
            }]
          }
        ]
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
