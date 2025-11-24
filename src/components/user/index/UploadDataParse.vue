<template>
  <div>

    <el-row>
      <el-col>
        <div id="upload_data_div" style="margin: 0px"></div>
        <div style="margin-top: -30px;margin-bottom: 30px; text-align: center;font-size: 25px">
          {{$t('uploadDataParse.chartTitle1')}}
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div id="pie" style="margin: 0px 10%"></div>
        <div style="margin-top: -25px;margin-bottom: 50px; text-align: center;font-size: 25px">
          {{$t('uploadDataParse.chartTitle2')}}
        </div>
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
          data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
          text: this.$t('uploadDataParse.chartTitle3'),
          subtext: this.$t('uploadDataParse.chartTitle4'),
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
              {value: 1048, name: this.$t('disciplines.law')},
              {value: 735, name: this.$t('disciplines.engineering')},
              {value: 580, name: this.$t('disciplines.management')},
              {value: 809, name: this.$t('disciplines.computerScience')},
              {value: 300, name: this.$t('disciplines.education')},
              {value: 247, name: this.$t('disciplines.economics')},
              {value: 677, name: this.$t('disciplines.militaryScience')},
              {value: 500, name: this.$t('disciplines.science')},
              {value: 22, name: this.$t('disciplines.history')},
              {value: 109, name: this.$t('disciplines.agronomy')},
              {value: 67, name: this.$t('disciplines.literature')},
              {value: 80, name: this.$t('disciplines.medicine')},
              {value: 50, name: this.$t('disciplines.artStudies')},
              {value: 123, name: this.$t('disciplines.philosophy')},
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
