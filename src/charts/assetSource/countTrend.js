/*
 * @Author: zhanghongqiao 
 * @Date: 2021-05-06 09:59:19 
 * @Email: 991034150@qq.com 
 * @Description: 数据趋势
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-05-07 14:49:06
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
      const {xaxis, dataRowUnit, dataSizeUnit, dataSizeList, dataRowList, rowMax, sizeMax} = this.sourceData
      let option = {
        color: ['#1D84EF', '#DA2726'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(129, 143, 180, 0.95)',
          formatter: function(params) {
            console.log(params)
            return `<span style="opacity: 0.65; font-size: 14px;">${params[0].axisValue}</span>
              <p style="font-size: 16px; padding: 6px 0;">数据条数：${params[1].value}${dataRowUnit}</p>
              <p style="font-size: 16px; ">较作日新增：${params[1].data.todayNewCount}条</p>
            `
          },
          axisPointer: {
            type: 'cross', 
          }
        }, 
        dataZoom: [{
            textStyle: {
              color: '#8392A5'
            },
            showDataShadow: false,
            bottom: 0,
            backgroundColor: 'rgba(129, 143, 180, 0.2)',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 12,
            handleStyle: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              // shadowColor: '#aaa'
            },
            dataBackgroundColor: 'none', // 底色
            fillerColor: '#B4D0F0', // 选中的颜色
            handleColor:'#1D84EF', // 滑块颜色
            type: 'slider',
            showDetail: false,
            height: "6px",
            y: "90%"
        }],
        grid: {
          left: 52,
          right: '4%',
        },
        legend: {
          data: ['数据量', '数据条数'],
          itemWidth: 7,
          itemHeight: 7
        },
        xAxis: [
          {
            type: 'category',
            data: xaxis,
            boundaryGap : false, 
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: `数据量(${dataSizeUnit})`, 
            nameTextStyle: {
              color: '#818FB4', 
            },
            min: 0,
            max: sizeMax,
            // interval: 5,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#818FB4'
            }, 
            splitLine: {
              show: false,
            }
          },
          {
            type: 'value',
            name: `数据条数(${dataRowUnit})`,  
            min: 0,
            max: rowMax,
            // interval: 5,
            nameTextStyle: {
              color: '#818FB4', 
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#818FB4'
            }, 
            splitLine: {
              show: false,
            }
          }
        ],
        series: [
          {
            name: '数据量',
            type: 'line',
            data: dataSizeList
          },
          {
            name: '数据条数',
            type: 'line',
            data: dataRowList 
          }, 
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
