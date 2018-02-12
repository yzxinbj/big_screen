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
    transform: translate(-23%, -9%) scale(0.82);
  }
  .anchorBL, .image {
    display:none;
  }
  .bubble {
    width: 200px;
    height: 183px;
    position: absolute;
    // background-position: 0 0;
    // background-size: 4000px 168px;
    background-repeat: no-repeat;
    background-image: url('../assets/images/bubble.png');
    z-index: 10;
    color: #fff;
    font-size: 14px;
    padding-top: 19px;
    display: none;

    .row {
      margin-bottom: 12px;
      margin-left: 16px;
      display: flex;
      // opacity: 0;

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
// import beijing from '@/common/mapData/beijing';
// import animate from '@/common/animate';
// import weiboDataArr from './weibo';
import addMarker from './addMarker';
import placeList from './placeList';
// console.log(placeList, 445)
// const echarts = require('echarts');
// require('echarts/extension/bmap/bmap');

export default {
  name: 'countryMap',
  data() {
    return {
      getDriverInterval: 60000,
      bmap: null,
    };
  },
  mounted() {
    this.setMap();
    // this.getDriver();
    // this.refreshData();
  },
  methods: {
    refreshData() {
      setInterval(this.getDriver, this.getDriverInterval);
    },
    getDriver() {
      this.$http.get('/api/v1/bigscreen/get_driver').then((res) => {
        if (res.data.code === 0) {
          const driverData = res.data.info.data;
          let driverIndex = 0;
          let showDriverTimer = setInterval(() => {
            addMarker(this.bmap, driverData[driverIndex]);
            driverIndex += 1;
            if (driverIndex >= driverData.length) {
              clearInterval(showDriverTimer);
              showDriverTimer = null;
            }
          }, Math.floor(this.getDriverInterval / driverData.length));
        }
      });
    },
    setMap() {
      const myChart = echarts2.init(document.querySelector('.countryMap'));

      const option = {
        backgroundColor: 'transparent',
        series: [
          {
            type: 'map',
            mapType: 'china',
            hoverable: false,
            roam: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  color: '#0a0d25',
                },
              },
            },
            data: [],
            markPoint: {
              symbol: 'diamond',
              symbolSize: 1,
              large: true,
              effect: {
                show: true,
                period: 10,
                scaleSize: 100,
                shadowBlur: 2,
                shadowColor: 'rgba(37, 140, 249, 0.8)',
                color: 'rgba(37, 140, 249, 0.8)',
              },
              data: (() => {
                const data = [];
                let len = 3000;
                let geoCoord = null;
                while (len--) {
                  geoCoord = placeList[len % placeList.length].geoCoord;
                  data.push({
                    name: placeList[len % placeList.length].name + len,
                    value: 10,
                    geoCoord: [
                      geoCoord[0] + Math.random() * 5 - 2.5,
                      geoCoord[1] + Math.random() * 3 - 1.5,
                    ],
                  });
                }
                return data;
              })(),
            },
          },
          {
            type: 'map',
            mapType: 'china',
            data: [],
            markPoint: {
              symbol: 'diamond',
              symbolSize: 1,
              large: true,
              effect: {
                show: true,
                period: 10,
                scaleSize: 100,
                shadowBlur: 1,
                shadowColor: 'rgba(14, 241, 242, 0.8)',
                color: 'rgba(14, 241, 242, 0.8)',
              },
              data: (() => {
                const data = [];
                let len = 3000;
                let geoCoord = null;
                while (len--) {
                  geoCoord = placeList[len % placeList.length].geoCoord;
                  data.push({
                    name: placeList[len % placeList.length].name + len,
                    value: 50,
                    geoCoord: [
                      geoCoord[0] + Math.random() * 5 - 2.5,
                      geoCoord[1] + Math.random() * 3 - 1.5,
                    ],
                  });
                }
                return data;
              })(),
            },
          },
          {
            type: 'map',
            mapType: 'china',
            hoverable: false,
            roam: true,
            data: [],
            markPoint: {
              symbol: 'diamond',
              symbolSize: 1,
              large: true,
              effect: {
                show: true,
                period: 15,
                scaleSize: 100,
                shadowBlur: 2,
                shadowColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgba(255, 255, 255, 0.8)',
              },
              data: (() => {
                const data = [];
                let len = placeList.length;
                while (len--) {
                  data.push({
                    name: placeList[len].name,
                    value: 90,
                    geoCoord: placeList[len].geoCoord,
                  });
                }
                return data;
              })(),
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    getMapData() {

    },
  },
};
</script>


