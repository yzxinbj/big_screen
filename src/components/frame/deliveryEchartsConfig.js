const echarts = require('echarts');

const gridColor = '#183d4a';

import info from './getData.js';

export default {
  xAxis: {
    axisTick:{
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,0.5)'
      }
    },
    nameTextStyle: {
      color: '#ffffff'
    },
    type: 'category',
    data: info.info.cities_info.map(item => item.city),
  },
  yAxis: [{
    type: 'value',
    min: 0,
    max: 10,
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,0.5)'
      }
    },
    axisLabel: {
      formatter: '{value} h',
    },
    splitLine: {
      lineStyle: {
        color: gridColor,
      },
    },
    axisTick:{
      show: false
    }
  }, {
    type: 'value',
    min: 0,
    max: 1000,
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,0.5)'
      }
    },
    axisLabel: {
      formatter: '{value} km',
    },
    splitLine: {
      lineStyle: {
        color: gridColor,
      },
    },
    axisTick:{
      show: false
    }
  }],
  series: [{
    data: info.info.cities_info.map(item => item.delivery_time),
    type: 'bar',
    barWidth: 14,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            {offset: 0, color: 'rgba(56,251,162,0.7)'},
            {offset: 1, color: 'rgba(44,224,231,0.7)'}
          ]
        )
      }
    }
  }, {
    yAxisIndex: 1,
    type: 'line',
    symbolSize: 8,
    smooth: false,
    showSymbol: false,
    lineStyle: {
      normal: {
        color: '#8640f4'
      }
    },
    itemStyle: {
      normal: {
        color: '#8640f4',
        borderWidth: 5,
      }
    },
    areaStyle: {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#8841f7' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(136,65,247,0)' // 100% 处的颜色
          }]
        }
        // opacity: 0.2
      }
    },
    data: info.info.cities_info.map(item => item.delivery_radius),
  }]
};
