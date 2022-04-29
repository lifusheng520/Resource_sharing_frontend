<template>
  <div>
    <el-row>
      <el-col>
        <div id="download_data_div" style="margin: 0px"></div>
        <div style="margin-top: -30px;margin-bottom: 30px; text-align: center;font-size: 25px">本周下载量分析</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div id="download_pie" style="margin: 0px 10%"></div>
        <div style="margin-top: -25px;margin-bottom: 50px; text-align: center;font-size: 25px">本周下载资源科目分析</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "DownloadDataParse",
    data() {
      return {}
    },
    methods: {},
    mounted() {
      var chartDom = document.getElementById('download_data_div');
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
            data: [12, 24, 5, 22, 1, 7, 4],
            type: 'line'
          },
          {
            data: [12, 24, 5, 22, 1, 7, 4],
            type: 'bar'
          }
        ]
      };

      myChart.setOption(option);

      // 饼图
      var pieChartDom = document.getElementById('download_pie');
      var myPieChart = echarts.init(pieChartDom);
      var pieOption;

      pieOption = {
        title: {
          text: '下载资源科目',
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
              {value: 11, name: '法学'},
              {value: 23, name: '工学'},
              {value: 2, name: '管理学'},
              {value: 34, name: '计算机科学'},
              {value: 12, name: '教育学'},
              {value: 6, name: '经济学'},
              {value: 9, name: '军事学'},
              {value: 10, name: '理学'},
              {value: 2, name: '历史学'},
              {value: 7, name: '农学'},
              {value: 3, name: '文学'},
              {value: 9, name: '医学'},
              {value: 7, name: '艺术学'},
              {value: 4, name: '哲学'},
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

  #download_data_div {
    width: 100%;
    height: 500px;
  }

  #download_pie {
    width: 100%;
    height: 600px;
  }

</style>
