<template>
  <div class="heatMap">
    <div class="top">
      <span class="info">
        运力热力图
      </span>
      <span class="title">
        {{city}}
      </span>
    </div>
    <div id="heatmapContainer" class="mapContainer">

    </div>
  </div>
</template>

<style lang="less">
  .heatMap {
    position: absolute;
    top: 309px;
    left: 67px;
    padding-top: 10px;
    height: 399px;
    width: 382px;
    overflow: hidden;
    background: url('../assets/images/heatMap.png') no-repeat;

    .top {
      margin-left: 10px;
      line-height: 34px;
      font-size: 20px;
      color: #fff;
      display: flex;

      .info {
        width: 132px;
        height: 34px;
        text-align: center;
        background: url('../assets/images/heatInfo.png') no-repeat;
      }

      .title {
        margin-left: 15px;

      }
    }

    .mapContainer {
      width: 360px;
      height: 330px;
      margin-left: 10px;
    }
    .anchorBL{display:none;}
  }
</style>
<script>
import data from './bus-line';

const echarts = require('echarts');
require('echarts/extension/bmap/bmap');

export default {
  name: 'heatMap',
  data() {
    return {
      title: '',
      city: '北京',
      timer: null,
    };
  },
  mounted() {
    this.setMap();
    this.refreshMap();
  },
  methods: {
    refreshMap() {
      // this.timer = setInterval(this.setMap, 1000);
    },
    setMap() {
      const echartsWrap = document.querySelector('#heatmapContainer')
      const myChart = echarts.init(echartsWrap);
      const busLines = Array.from(data).map((busLine) => {
        let prevPt;
        const points = [];
        for (let i = 0; i < busLine.length; i += 2) {
          let pt = [busLine[i], busLine[i + 1]];
          if (i > 0) {
            pt = [
              prevPt[0] + pt[0],
              prevPt[1] + pt[1],
            ];
          }
          prevPt = pt;

          points.push([pt[0] / 1e4, pt[1] / 1e4]);
        }
        return {
          coords: points,
        };
      });

      myChart.setOption({
        bmap: {
          center: [116.46, 39.92],
          zoom: 8,
          roam: true,
          mapStyle: {
            styleJson: [{
              featureType: 'water',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'land',
              elementType: 'all',
              stylers: {
                color: '#0b1326',
              },
            }, {
              featureType: 'railway',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'highway',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'arterial',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'poi',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'green',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'subway',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'manmade',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'local',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'arterial',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'boundary',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'building',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }, {
              featureType: 'label',
              elementType: 'all',
              stylers: {
                visibility: 'off',
              },
            }],
          },
        },
        // series: [{
        //   type: 'lines',
        //   coordinateSystem: 'bmap',
        //   polyline: true,
        //   data: busLines,
        //   silent: true,
        //   lineStyle: {
        //     normal: {
        //       color: '#ff7200',
        //       opacity: 0.2,
        //       width: 1,
        //     },
        //   },
        //   progressiveThreshold: 500,
        //   progressive: 200,
        // }],
      });
      const bmap = myChart.getModel().getComponent('bmap').getBMap();
      function getBoundary() {
        const bdary = new BMap.Boundary();
        bdary.get('北京市', (rs) => {
          const count = rs.boundaries.length;
          let pointArray = [];
          for (let i = 0; i < count; i += 1) {
            const ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 1, // 设置多边形边线线粗
              strokeOpacity: 1, // 设置多边形边线透明度0-1
              StrokeStyle: 'solid', // 设置多边形边线样式为实线或虚线，取值 solid 或 dashed
              strokeColor: '#a6d0ff', // 设置多边形边线颜色
              fillColor: '#21252e', // 设置多边形填充颜色
              fillOpacity: 1,
            });
            bmap.addOverlay(ply);
            pointArray = pointArray.concat(ply.getPath());
          }
          bmap.setViewport(pointArray);
        });
        $(echartsWrap).css('transform', 'scale(1)');
      }
      getBoundary();
    },
    getMapData() {

    },
  },
};
</script>

<!-- , {
  type: 'lines',
  coordinateSystem: 'bmap',
  polyline: true,
  data: busLines,
  lineStyle: {
    normal: {
      width: 0,
    },
  },
  effect: {
    constantSpeed: 20,
    show: true,
    trailLength: 0.1,
    symbolSize: 1.5,
  },
  zlevel: 1,
} -->
