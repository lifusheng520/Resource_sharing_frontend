<template>
  <div style="width: 100%">
    <div style="margin: 3%;width: 94%">

      <h3>数据统计</h3>
      <br>

      <div style="width: 100%;">

        <div id="chart-div"></div>

      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "DataCenter",
    data() {
      return {}
    },
    created() {
    },
    methods: {},
    mounted() {
      var chartDom = document.getElementById('chart-div');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '2022年系统服务器分析'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['上传量', '下载量', '浏览量', '用户量']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '上传量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '下载量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '浏览量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '用户量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [0, 400, 413, 425, 442, 457, 672]
          },
        ]
      };

      option && myChart.setOption(option);
    }
  }
</script>

<style scoped>

  #chart-div{
    width: 100%;
    height: 500px;
  }

</style>
