<template>
  <div class="orderData">
    <data-flip
      :title="item.title"
      :type="item.type"
      :start="item.start"
      :end="item.end"
      :time="item.time"
      v-for="item in dataTypes"
      :key="item.id"
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
      dataTypes,
    };
  },
  mounted() {
    // this.setData();
    // this.refreshData();
  },
  methods: {
    refreshData() {

    },
    setData() {

    },
  },
};
</script>
