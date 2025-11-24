<template>
  <div style="width: 100%">
    <div style="margin: 3%;width: 94%">

      <h3>{{$t('dataCenter.title')}}</h3>
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
          text: '2022年'
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
          data: [this.$t('dataCenter.dataItem1'), this.$t('dataCenter.dataItem2'), this.$t('dataCenter.dataItem3'), this.$t('dataCenter.dataItem4')]
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
            data: ['Jan.', 'Feb.', 'Mar.', 'Apr.']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$t('dataCenter.dataItem1'),
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: this.$t('dataCenter.dataItem2'),
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: this.$t('dataCenter.dataItem3'),
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: this.$t('dataCenter.dataItem4'),
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
