import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import chartConfig from 'constants/chartConfig';

const area = {};
area.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Acquisition', 'Revenue'],
    textStyle: {
      color: chartConfig.color.text
    }
  },
  toolbox: {
    show: false
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.'],
      axisLabel: {
        textStyle: {
          color: chartConfig.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: chartConfig.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      max: 100,
      axisLabel: {
        textStyle: {
          color: chartConfig.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: chartConfig.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: chartConfig.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Acquisition',
      type: 'bar',
      data: [17, 11, 22, 35, 76, 40, 28, 25],
      itemStyle: {
        normal: {
          color: chartConfig.color.info
        }
      },
      lineStyle: {
        normal: {
          color: chartConfig.color.info
        }
      },
      areaStyle: {
        normal: {
          color: chartConfig.color.info
        }
      },
      symbol: 'diamond'
    },
    {
      name: 'Revenue',
      type: 'bar',
      barCategoryGap: '35%',
      data: [15, 13, 20, 40, 81, 37, 26, 26],
      itemStyle: {
        normal: {
          color: chartConfig.color.success
        }
      },
      lineStyle: {
        normal: {
          color: chartConfig.color.success
        }
      },
      areaStyle: {
        normal: {
          color: chartConfig.color.success
        }
      },
      symbol: 'diamond'
    }
  ]
};

const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={area.options} showLoading={false} />
);

export default Chart;
