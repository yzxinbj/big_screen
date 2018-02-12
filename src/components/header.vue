<template>
  <div class="header">
    <div class="title" @click="switchFullscreen()">
        云鸟智慧运力平台
    </div>
    <div class="time">
        <span>{{ymd}}</span>
        <span class="hms"> {{hms}}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .header{
    width: 1920px;
    height: 77px;
    color:  #fff;
    background: url('../assets/images/header.png') no-repeat;
    position: absolute;

    .title {
      font-size: 38px;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .time {
      font-size: 22px;
      line-height: 28px;
      position: absolute;
      letter-spacing: 1px;
      left: 1600px;
      top: 16px;

      .hms {
        color:  #fc6f31;
      }
    }
  }
</style>

<script>
export default {
  name: 'watchHeader',
  data() {
    return {
      ymd: '',
      hms: '',
      timer: null,
    };
  },
  created() {
    this.setTime();
    this.refreshTime();
  },
  methods: {
    switchFullscreen() {
      const element = document.documentElement;
      // 先检测最标准的方法
      if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.mozRequestFullScreen) {
        // 其次，检测Mozilla的方法
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        // if 检测 webkit的API
        element.webkitRequestFullScreen();
      }
    },
    refreshTime() {
      this.timer = setInterval(this.setTime, 1000);
    },
    setTime() {
      [this.ymd, this.hms] = this.getCurrentTime();
    },
    formatNumber(number) {
      return number.toString().padStart(2, '0');
    },
    getCurrentTime() {
      const date = new Date();
      const [year, month, day, hour, minute, second] = [
        date.getFullYear(),
        this.formatNumber(date.getMonth() + 1),
        this.formatNumber(date.getDate()),
        this.formatNumber(date.getHours()),
        this.formatNumber(date.getMinutes()),
        this.formatNumber(date.getSeconds()),
      ];
      return [`${year}年${month}月${day}日`, `${hour}:${minute}:${second}`];
    },
  },
};
</script>
