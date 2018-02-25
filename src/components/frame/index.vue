<template>
    <div class="left-box">
        <div class="screen-box">
            <h4 class="title one"></h4>
            <div class="long-juan-feng-small"></div>
            <car-info></car-info>
        </div>
        <div class="screen-box">
            <h4 class="title two"></h4>
            <div class="car-type"></div>
            <car-type-info></car-type-info>
            <div class="car-type-info-box">
                <div v-for="item in carTypeInfo">
                    <span class="city-title">{{item.city}}</span>
                    <span>{{item.carType}}</span>
                    <span :class="{
                            'jinbei': ~item.carType.indexOf('金杯'),
                            'xianghuo': ~item.carType.indexOf('箱货'),
                            'xiaomian': ~item.carType.indexOf('小面'),
                    }"></span>
                    <span>{{item.percentage * 100}}%</span>
                </div>
            </div>
        </div>
        <div class="screen-small-box">
            <h4 class="title three"></h4>
            <div class="delivery-icon-box">
                <div class="delivery-icon one">交付时长</div>
                <div class="delivery-icon">配送半径</div>
            </div>
            <div id="echartsBox" class="echarts-content">

            </div>
        </div>
    </div>
</template>

<script>
  import echartsConfig from './deliveryEchartsConfig.js';
  import CarInfo from './outOfTheCar.vue';
  import CarTypeInfo from './carTypeInfo.vue';
  const echarts = require('echarts');
  
  import info from './getData.js';
  const cities_info = info.info.cities_info;


  export default {
    components: {
      CarInfo,
      CarTypeInfo
    },
    mounted() {
      this.animate({
        ele: $('.long-juan-feng-small'),
        wholeWidth: 72 * 740 / 2,
        singleWidth: 740 / 2,
        clear: false,
        cb: $.noop(),
        framePerSecond: 18
      });

      this.animate({
        ele: $('.car-type'),
        wholeWidth: 216 * 150,
        singleWidth: 150,
        clear: false,
        cb: $.noop(),
        framePerSecond: 18
      });

      this.setBar(); 
    },
    created () {

    },
    data () {
      return {
        carTypeInfo: [
          {
            city: '北京',
            carType: '金杯',
            percentage: 0.50
          },
          {
            city: '北京',
            carType: '箱货',
            percentage: 0.50
          },
          {
            city: '北京',
            carType: ' 小面',
            percentage: 0.50
          },
          {
            city: '北京',
            carType: '金杯',
            percentage: 0.50
          },
        ],
      };
    },
    methods: {
      setBar(){
        var myChart = echarts.init(document.getElementById('echartsBox'));

        var option = echartsConfig;
        var count = 1;

        setInterval(function () {
          option.xAxis.data = cities_info.map(item => item.city).slice(count * 7, count * 7 + 7 > 20 ? 20 : count * 7 + 7);
          option.series[0].data = cities_info.map(item => item.delivery_time).slice(count * 7, count * 7 + 7 > 20 ? 20 : count * 7 + 7);
          option.series[1].data = cities_info.map(item => item.delivery_radius).slice(count * 7, count * 7 + 7 > 20 ? 20 : count * 7 + 7);
          
          count++;
          if (count == 3) count = 0;
          myChart.setOption(option);
        }, 5000);
      },
      animate (opt) {
        var count = 0;

        var timer = setInterval(function () {
          opt.ele.css('background-position-x', -count * opt.singleWidth + 'px');
          count++;

          if ((opt.wholeWidth - opt.singleWidth) / opt.singleWidth < count) {
            count = 0;
            opt.clear && clearInterval(timer);
          }

          opt.cb && opt.cb(count);
        }, 1000 / (opt.framePerSecond || 24));
      }
    }
  };
</script>

<style lang="less" scoped>
    @url: '../../assets/images';

    .bg(@img) {
        background: url('@{url}/@{img}') no-repeat;
    }

    .left-box {
        width: 620px;
        height: 336*3+30px;
        position: absolute;
        top: 85px;
        right: 23px;

        .screen-box {
            width: 611px;
            height: 336px;
            .bg('kuang_big.png');
            margin-bottom: 10px;
            display: block;
            position: relative;
        }
        .screen-small-box {
            width: 611px;
            height: 265px;
            .bg('kuang.png');
            overflow: hidden;
            position: relative;
        }
        h4.title {
            position: absolute;
            top: 10px;
            left: 10px;
            .bg('all_icon.png');
            margin: 0;
            height: 35px;
            &.one {
                width: 202px;
                background-position: 0 0px;
            }
            &.two {
                width: 142px;
                background-position: 0 -2*64px;
            }
            &.three {
                width: 320px;
                background-position: 0 -1*64px;
            }
        }
    }

    .long-juan-feng-small {
        .bg('output0_small.png');
        width: 740px/2;
        height: 552px/2;
        position: absolute;
        top: 50px;
        left: 124px;
    }

    .car-type {
        width: 150px;
        height: 150px;
        position: absolute;
        top: 35px;
        left: 232px;
        .bg('carType.png');
    }

    .car-type-info-box {
        width: 565px;
        height: 112px;
        border-radius: 4px;
        border: solid 1px rgba(255, 255, 255, 0.29);
        display: flex;
        flex-flow: row wrap;
        position: absolute;
        bottom: 26px;
        left: 23px;
        box-sizing: border-box;
        padding: 5px 20px 0 30px;
        > div {
            width: 190px;
            height: 36px;
            display: flex;
            flex-flow: row nowrap;
            margin: 10px 0 0 0;
            font-size: 16px;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.7);
            align-items: center;
            &:nth-of-type(odd) {
                margin-right: 80px;
            }
            > span {
                &.city-title {
                    margin-right: 30px;
                }

                .icon() {
                    .bg('all_icon.png');
                    width: 38px;
                    height: 16px;
                    margin: 0 10px;
                }

                &.jinbei {
                    .icon();
                    background-position: 0 -3*64px;
                }
                &.xianghuo {
                    .icon();
                    background-position: 0 -5*64px;
                }
                &.xiaomian {
                    .icon();
                    background-position: 0 -4*64px;
                }

            }
        }
    }

    .cache-box {
        display: none;
    }

    .delivery-icon-box {
        width: 220px;
        height: 16px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 20px;
        top: 20px;
        .delivery-icon {
            .bg('all_icon.png');
            padding: 0 0 0 20px;
            background-position: 0 -14*64px;
            &.one {
                background-position: 0 -13*64px;
                margin: 0 30px 0 0;
            }
        }
    }

    #echartsBox {
        width: 580px;
        height: 231px;
        margin: 50px 0 0 10px;
        > div {
            margin: 0;
        }
    }
</style>