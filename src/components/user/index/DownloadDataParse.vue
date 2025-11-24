<template>
  <div>
    <el-row>
      <el-col>
        <div id="download_data_div" style="margin: 0px"></div>
        <div style="margin-top: -30px;margin-bottom: 30px; text-align: center;font-size: 25px">{{$t('downloadDataParse.chartTitle1')}}</div>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div id="download_pie" style="margin: 0px 10%"></div>
        <div style="margin-top: -25px;margin-bottom: 50px; text-align: center;font-size: 25px">{{$t('downloadDataParse.chartTitle2')}}</div>
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
          data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [12, 24, 5, 22, 1, 7, 40],
            type: 'line'
          },
          {
            data: [12, 24, 5, 22, 1, 7, 40],
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
          text: this.$t('downloadDataParse.chartTitle3'),
          subtext: this.$t('downloadDataParse.chartTitle4'),
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
              {value: 11, name: this.$t('disciplines.law')},
              {value: 23, name: this.$t('disciplines.engineering')},
              {value: 2, name: this.$t('disciplines.management')},
              {value: 34, name: this.$t('disciplines.computerScience')},
              {value: 12, name: this.$t('disciplines.education')},
              {value: 6, name: this.$t('disciplines.economics')},
              {value: 9, name: this.$t('disciplines.militaryScience')},
              {value: 10, name: this.$t('disciplines.science')},
              {value: 2, name: this.$t('disciplines.history')},
              {value: 7, name: this.$t('disciplines.agronomy')},
              {value: 3, name: this.$t('disciplines.literature')},
              {value: 9, name: this.$t('disciplines.medicine')},
              {value: 7, name: this.$t('disciplines.artStudies')},
              {value: 4, name: this.$t('disciplines.philosophy')},
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
