<template>
<div>
  <div class="image">
    <img src="/static/output/output0.png">
    <img src="/static/output/output1.png">
    <img src="/static/output/output2.png">
    <img src="/static/output/output3.png">
    <img src="/static/output/output4.png">
    <img src="/static/output/output5.png">
    <img src="/static/output/output6.png">
    <img src="/static/output/output7.png">
  </div>
  <div class="countryMap">

  </div>
</div>
</template>

<style lang="less">
  .countryMap {
    position: absolute;
    width: 2400px;
    height: 1350px;
    transform: translate(-16%,-11%) scale(0.82);
  }
  .anchorBL, .image {
    display:none;
  }
  .bubble {
    width: 200px;
    height: 183px;
    position: absolute;
    background-position: 0 0;
    background-size: 4000px 168px;
    background-repeat: no-repeat;
    z-index: 10;
    color: #fff;
    font-size: 14px;
    padding-top: 19px;


    .row {
      margin-bottom: 12px;
      margin-left: 16px;
      display: flex;
      opacity: 0;

      .head {
        width: 38px;
        height: 38px;
        border-radius: 50%;
      }

      .name {
        line-height: 38px;
        margin-left: 6px;
      }

      .status {
        color: #ffe65c;
      }
    }

  }
</style>
<script>
import data from './bus-line';
import animate from '../common/animate';

const echarts = require('echarts');
require('echarts/extension/bmap/bmap');

export default {
  name: 'countryMap',
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.setMap();
    // this.refreshMap();
  },
  methods: {
    refreshMap() {
      // this.timer = setInterval(this.setMap, 1000);
    },
    setMap() {
      const myChart = echarts.init(document.querySelector('.countryMap'));
      const hStep = 300 / (data.length - 1);
      const busLines = Array.from(data).map((busLine, idx) => {
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
          lineStyle: {
            normal: {
              color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx)),
            },
          },
        };
      });
      myChart.setOption({
        bmap: {
          center: [109.46, 39.92],
          zoom: 6,
          roam: false,
          aspectScale: 0.9,
          mapStyle: {
            styleJson: [{
              featureType: 'water',
              elementType: 'all',
              stylers: {
                color: '#044161',
                visibility: 'off',
              },
            }, {
              featureType: 'land',
              elementType: 'all',
              stylers: {
                color: '#2b2f54',
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
            // }, {
            //   featureType: 'boundary',
            //   elementType: 'all',
            //   stylers: {
            //     visibility: 'off',
            //   },
            }, {
              featureType: 'boundary',
              elementType: 'geometry',
              stylers: {
                color: '#8b8787',
                weight: 1,
                lightness: -29,
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
        // }, {
        //   type: 'lines',
        //   coordinateSystem: 'bmap',
        //   polyline: true,
        //   data: busLines,
        //   lineStyle: {
        //     normal: {
        //       width: 0,
        //     },
        //   },
        //   effect: {
        //     constantSpeed: 20,
        //     show: true,
        //     trailLength: 0.1,
        //     symbolSize: 1.5,
        //   },
        //   zlevel: 1,
        // }],
      });
      const bmap = myChart.getModel().getComponent('bmap').getBMap();
      $(bmap.Va).css('background', 'transparent');
      function addMarker(markerData) {
        // const marker = new BMap.Marker(new BMap.Point(markerData.lng, markerData.lat));
        const myIcon = new BMap.Icon('/static/transparency.png', new BMap.Size(10, 10));
        const marker = new BMap.Marker(new BMap.Point(markerData.lng, markerData.lat), { icon: myIcon,
          enableClicking: false,
        });
        bmap.addOverlay(marker);
        setTimeout(() => {
          let $html = $(`<div class="bubble">
              <div class="row">
                <img src="https://api.map.baidu.com/images/copyright_logo.png" class="head">
                <span class="name">云鸟司机：张师傅</span>
              </div>
              <div class="row">
                <span>车牌号：</span><span>京PG9**01</span>
              </div>
              <div class="row">
                <span>订单状态：</span><span class="status">配送中</span>
              </div>
              <div class="row">
                <span>所在城市：</span><span>北京</span>
              </div>
            </div>`);
          $html.css({ left: marker.V.offsetLeft - 475, top: marker.V.offsetTop - 291.5 }).appendTo($('#app'));
          marker.hide();
          animate({
            ele: $html,
            framePerSecond: 18,
            marker,
            bmap,
          });
        }, 0);
      }
      let lng = 120;
      let lat = 49;
      const timer = setInterval(() => {
        addMarker({
          lng: lng -= 2,
          lat: lat -= 2,
        });
        if (lng < 100) {
          clearInterval(timer);
        }
      }, 1000);
    },
    getMapData() {

    },
  },
};
</script>


