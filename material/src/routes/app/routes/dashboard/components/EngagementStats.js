import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts/theme/macarons';
import chartConfig from 'constants/chartConfig';

// Engagment pie charts
const labelTop = {
  normal: {
    show: true,
    position: 'center',
    formatter: '{b}',
    textStyle: {
      color: 'rgba(0,0,0,.54)',
      baseline: 'bottom',
      fontSize: 14
    }
  }
};
// const labelTop = {
//     normal : {
//         color: chartConfig.color.info,
//         label : {
//             show : true,
//             position : 'center',
//             formatter : '{b}',
//             textStyle: {
//                 color: chartConfig.color.text,
//                 baseline : 'bottom',
//                 fontSize: 14
//             }
//         },
//         labelLine : {
//             show : false
//         }
//     }
// };
const labelFromatter = {
  normal: {
    label: {
      position:'center',
      formatter(params) {
        return `${100 - params.value}%`;
      },
      textStyle: {
        color: 'rgba(0,0,0,.54)',
        baseline: 'bottom',
        fontSize: 12
      }
    }
  },
};
const labelBottom = {
  normal: {
    color: 'rgba(0,0,0,.1)',
    label: {
      show: true,
      position: 'center'
    },
    labelLine: {
      show: false
    }
  }
};
const radius = [65, 70];

const pie1 = {};
const pie2 = {};
const pie3 = {};
const pie4 = {};

pie1.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Bounce', value: 36, label: labelTop, labelLine: {normal: {show: false}}, itemStyle: {normal: {color: chartConfig.color.success}}},
      {name: 'other', value: 64, itemStyle: labelBottom}
    ]
  }]
};

pie2.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Activation', value: 45, label: labelTop, itemStyle: {normal: {color: chartConfig.color.info}}},
      {name: 'other', value: 55, itemStyle: labelBottom}
    ]
  }]
};
pie3.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Retention', value: 25, label: labelTop, itemStyle: {normal: {color: chartConfig.color.success}}},
      {name: 'other', value: 75, itemStyle: labelBottom}
    ]
  }]
};
pie4.options = {
  series: [{
    type: 'pie',
    radius,
    itemStyle: labelFromatter,
    data: [
      {name: 'Referral', value: 75, label: labelTop, itemStyle: {normal: {color: chartConfig.color.info}}},
      {name: 'other', value: 25, itemStyle: labelBottom}
    ]
  }]
};

const Stats = () => (
  <div className="row">
    <div className="col-xl-3 col-lg-6">
      <ReactEcharts style={{height: '200px'}} option={pie1.options} showLoading={false} />
    </div>
    <div className="col-xl-3 col-lg-6">
      <ReactEcharts style={{height: '200px'}} option={pie2.options} showLoading={false} />
    </div>
    <div className="col-xl-3 col-lg-6">
      <ReactEcharts style={{height: '200px'}} option={pie3.options} showLoading={false} />
    </div>
    <div className="col-xl-3 col-lg-6">
      <ReactEcharts style={{height: '200px'}} option={pie4.options} showLoading={false} />
    </div>
  </div>
);

export default Stats;
