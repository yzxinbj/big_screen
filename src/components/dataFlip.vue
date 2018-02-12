<template>
  <div ref="orderDataItem">
    <div class="title">
      <i class="icon" :class="{
      'orders': type==='orders',
      'distance': type==='distance',
      'delivery': type==='delivery',
      'delivered': type==='delivered',
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
    .orders {
      .bg('order.png');
      margin-bottom: -4px;
    }
    .distance {
      .bg('distance.png');
      margin-bottom: -4px;
    }
    .delivery {
      .bg('truck.png');
      margin-bottom: -4px;
    }
    .delivered {
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
      type: Number,
      default: 60000,
    },
    len: {
      type: String,
      default: '6',
    },
  },
  data() {
    return {
      dom: null,
    };
  },
  mounted() {
    this.initDom();
    this.startFlip();
  },
  watch: {
    end() {
      this.startFlip();
    },
  },
  methods: {
    initDom() {
      let domLength = +this.len;
      if (domLength > 0) {
        this.dom = $('<div class="dataStatistics"></div>');
        while (domLength > 0) {
          this.dom.append($('<div class="digit_set"></div>'));
          domLength -= 1;
        }
        this.dom.children('div:last-child').addClass('set_last');

        // $(this.$refs.orderDataItem).find('.dataStatistics').remove();
        $(this.$refs.orderDataItem).append(this.dom);
      }
    },
    startFlip() {
      const domLength = +this.len;
      if (domLength > 0) {
        this.dom.dataStatistics({
          start: +this.start,
          end: +this.end,
          time: +this.time,
          len: +this.len,
        });
      }
    },
  },
};
</script>
