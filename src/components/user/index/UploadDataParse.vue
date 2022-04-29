<template>
  <div>

    <el-row>
      <el-col>
        <div id="upload_data_div" style="margin: 0px"></div>
        <div style="margin-top: -30px;margin-bottom: 30px; text-align: center;font-size: 25px">本周上传量分析</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div id="pie" style="margin: 0px 10%"></div>
        <div style="margin-top: -25px;margin-bottom: 50px; text-align: center;font-size: 25px">本周上传资源科目分析</div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "UploadDataParse",
    data() {
      return {}
    },
    methods: {},
    // 页面元素渲染完之后再触发
    mounted() {
      var chartDom = document.getElementById('upload_data_div');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          },
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'bar'
          }
        ]
      };

      myChart.setOption(option);

      // 饼图
      var pieChartDom = document.getElementById('pie');
      var myPieChart = echarts.init(pieChartDom);
      var pieOption;

      pieOption = {
        title: {
          text: '上传资源科目',
          subtext: '本周',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: [
              {value: 1048, name: '法学'},
              {value: 735, name: '工学'},
              {value: 580, name: '管理学'},
              {value: 809, name: '计算机科学'},
              {value: 300, name: '教育学'},
              {value: 247, name: '经济学'},
              {value: 677, name: '军事学'},
              {value: 500, name: '理学'},
              {value: 22, name: '历史学'},
              {value: 109, name: '农学'},
              {value: 67, name: '文学'},
              {value: 80, name: '医学'},
              {value: 50, name: '艺术学'},
              {value: 123, name: '哲学'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myPieChart.setOption(pieOption);

    },
  }
</script>

<style scoped>

  #upload_data_div {
    width: 100%;
    height: 500px;
  }

  #pie {
    width: 100%;
    height: 600px;
  }

</style>
