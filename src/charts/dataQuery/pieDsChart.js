/*
 * @Author: xiexiaoying
 * @Date: 2021-04-01 14:18
 * @Email: 634021337@qq.com
 * @Description: 数据占比
 * @Last Modified by: xiexiaoying
 * @Last Modified time: 2021-04-01 14:18
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
    sourceData: Array,
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
      if (_.isEmpty(this.sourceData)) {
        return
      }

      let datas = this.sourceData
      let legendData = [], total= 0
      for (let j = 0; j < datas.length; j++) {
        let data = {
          name: datas[j].name,
          icon: 'circle',
          textStyle: {
            fontSize: 14,
            //   color: colors[j]
          }
        }
        total += datas[j].value;
        legendData.push(data)
      }
     let option = {
        backgroundColor: '#fff',
        color: ["#1D84EF","#F4664A",  "#30BF78"],
        grid: {
          left: '2%',
          top: '1%',
          bottom: 10,
          right: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 14
          },
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '50%',
          itemGap: 35,
          // data: ['应用数据', '计算机数据', '原始数据'],
          formatter: function (name) {
            let target,percent;
            for (let i = 0; i < datas.length; i++) {
              if (datas[i].name === name) {
                target = datas[i].value;
                percent = ((target/total)*100).toFixed(2);
              }
            }
            return name + '  ' +  percent + '%'
          },

          data: legendData,
        },
        calculable: true,
        series: [{
          type: 'pie',
          radius: ["34.2%", "34.5%"],
          center: ['28%', '50%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          data: [{
            name: '',
            value: 0,
            itemStyle: {
              normal: {
                color: "#F0F0F0"
              }
            }
          }]
        }, {

          type: 'pie',
          radius: ['45%', '68%'],
          center: ['28%', '50%'],
          roseType: 'area',
          zlevel: 10,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: datas
        }, ]
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
