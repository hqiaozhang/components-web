/*
 * @Author: zhanghongqiao 
 * @Date: 2021-06-03 11:14:49 
 * @Email: 991034150@qq.com 
 * @Description: 首页
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-06-07 16:23:22
 */

 <template>
   <div class="editor_view">
      <!-- 顶部菜单 -->
      <div class="topbar_view">
        <Topbar />  
      </div>

      <div class="toolbar_view" v-show="!preview">
        <Toolbar /> 
      </div>
      <div class="config_view" v-show="!preview">
        <Config /> 
      </div>
      <div class="scale_view">
        <ScaleBar @update:scale="changeScale" /> 
      </div>
      <div class="main_view">
        <router-view :scale="scale" ref="screenContainer"></router-view> 
      </div>
   </div>
 </template>
 
 <script>
 import './index.scss'
 import Topbar from '@/components/editor/topbar'
 import Toolbar from '@/components/editor/toolbar'
 import ScaleBar from '@/components/editor/scaleBar'
 import Config from '@/components/editor/config.vue';
 import html2canvas from 'html2canvas';
 
 var interval;
export default {
  components: { 
    Topbar,
    Toolbar, 
    ScaleBar,
    Config
  },
  data() {
    return {
      title: '',
      scale: 0.7,
      preview: false,
      chartData: {
        elements: [],
      },
      publishPopVisible: false,
      currentElementIndex: -1,
    };
  },
  computed: {
    currentElement() {
      if (this.currentElementIndex >= 0) {
        return this.chartData.elements[this.currentElementIndex];
      }
      return {};
    },
  },
  mounted() {
    this.$http.get('/chart/' + this.$route.params.id)
      .then((res) => {
        const { errno, data } = res.data;
        if (errno === 0) {
          this.title = data.title;
          this.chartData = data.chartData;
        }
      })
      .catch(() => {});
  },
  beforeDestroy() {
    clearInterval(interval);
  },
  methods: {
    changeScale(scale) {
      this.scale = scale;
    },
    setActiveComponentByIndex(index) {
      this.currentElementIndex = index;
      for (let i = 0; i < this.chartData.elements.length; i += 1) {
        const element = this.chartData.elements[i];
        if (index === i) {
          element.active = true;
        } else {
          element.active = false;
        }
      }
    },
    addComponent(data) { 
      
      this.chartData.elements.unshift(data); 
    },
    deleteComponent(index) {
      this.chartData.elements.splice(index, 1);
    },
    saveChartData() {
      const screenshot = this.generateScreenShot().then(url => {
        this.$http.put('/chart/' + this.$route.params.id, {
          img: url,
          chartData: this.chartData,
        })
          .then((res) => {
            const { errno, data } = res.data;
            if (errno === 0) {
              // this.publishPopVisible = true;
              this.$message({
                type: "success",
                message: "保存成功"
              });
            }
          })
          .catch(() => {});
      });
    },
    generateData(item) {
      if (item.data.datacon.type == 'raw') {
        item.data.generated = item.data.datacon.data
      } else if (item.data.datacon.type == 'connect') {
        this.$http.get('/connect/' + item.data.datacon.connectId)
          .then((res) => {
            const { errno, data } = res.data;
            if (errno === 0) {
              // console.log(data.data);
              item.data.generated = data.data;
            }
          })
          .catch(() => {});
      } else if (item.data.datacon.type == 'get') {
        clearInterval(interval);
        let time = item.data.datacon.interval ? item.data.datacon.interval : 1;
        interval = setInterval(() => {
          this.$http.get(item.data.datacon.getUrl)
            .then((res) => {
              item.data.generated = res.data;
            })
            .catch(() => {});
        }, time * 1000)
      }
    },
    generateScreenShot() {
      let that = this;
      return new Promise(function(resolve, reject) {
        let screenRef = that.$refs['screenContainer'].$refs['screen'];
        html2canvas(screenRef, {
          backgroundColor: '#142E48'
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        })
      })
    }
  },
};
</script>

 

