<template>
  <div ref="orderDataItem">
    <div class="title">
      <i class="icon" :class="{
      'order': type==='order',
      'distance': type==='distance',
      'truck': type==='truck',
      'tuotou': type==='tuotou',
      'warehouse': type==='warehouse',
      'weight': type==='weight',
      }"></i>
      <span>{{title}}</span>
    </div>
  </div>
</template>

<style lang="less">
  @import '../assets/css/dataStatistics.css';
  @url: '../assets/images';

  .bg(@img) {
    background: url('@{url}/@{img}') no-repeat;
  }

  .title {
    margin-bottom: 10px;
    .icon {
      width: 24px;
      height: 24px;
      display: inline-block;
    }
    span {
      color: #b4bdf2;
      font-size: 20px;
    }
    .order {
      .bg('order.png');
      margin-bottom: -4px;
    }
    .distance {
      .bg('distance.png');
      margin-bottom: -4px;
    }
    .truck {
      .bg('truck.png');
      margin-bottom: -4px;
    }
    .tuotou {
      .bg('tuotou.png');
      margin-bottom: -4px;
    }
    .warehouse {
      .bg('warehouse.png');
      margin-bottom: -4px;
    }
    .weight {
      .bg('weight.png');
      margin-bottom: -4px;
    }
  }
</style>
<script>
import '../assets/js/dataFlip';

export default {
  name: 'dataFlip',
  props: {
    title: '',
    type: '',
    start: '',
    end: '',
    time: {
      type: String,
      default: '30000',
    },
  },
  data() {
    return {
      dom: null,
      timer: null,
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      this.dom = $(
        `<div class="dataStatistics">
          <div class="digit_set"></div>
          <div class="digit_set"></div>
          <div class="digit_set"></div>
          <div class="digit_set"></div>
          <div class="digit_set"></div>
          <div class="digit_set set_last"></div>
        </div>`);
      $(this.$refs.orderDataItem).find('.dataStatistics').remove();
      $(this.$refs.orderDataItem).append(this.dom);
      $(this.$refs.orderDataItem).find('.dataStatistics').dataStatistics({
        start: +this.start,
        end: +this.end,
        time: +this.time,
        len: 6,
      });
    },
  },
};
</script>
