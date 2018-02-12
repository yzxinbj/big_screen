<template>
  <div class="orderData">
    <data-flip
      v-for="item in dataTypes"
      :key="item.id"
      :title="item.title"
      :type="item.type"
      :start="item.start"
      :end="item.end"
      :time="item.time"
      :len="item.len"
    />
  </div>
</template>

<style lang="less">
  .orderData {
    display: flex;
    position: absolute;
    top: 120px;
    left: 55px;

    &>div {
      padding-right: 37px;
    }
  }

</style>

<script>
import dataFlip from './dataFlip';
import dataTypes from './dataTypes';

export default {
  name: 'orderData',
  components: {
    dataFlip,
  },
  data() {
    return {
      interval: 20000,
      dataTypes,
    };
  },
  mounted() {
    this.setData();
    this.refreshData();
  },
  methods: {
    refreshData() {
      setInterval(this.setData, this.interval);
    },
    setData() {
      this.$http.get('/api/v1/bigscreen/get_order').then(res => {
        if (res.data.code === 0) {
          const orderData = res.data.info.data;
          dataTypes.forEach(item => {
            item.start = item.end;
            item.end = orderData[item.type];
            item.time = this.interval;
          });
          this.dataTypes = dataTypes;
        }
      });
    },
  },
};
</script>
