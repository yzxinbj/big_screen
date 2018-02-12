<template>
<div>
  <country-map></country-map>
  <watch-header></watch-header>
  <order-data></order-data>
  <heat-map></heat-map>
  <frame-box></frame-box>
</div>
</template>

<script>
import watchHeader from './header';
import orderData from './orderData';
import heatMap from './heatMap';
import countryMap from './countryMap';
import frameBox from './frame/index';

export default {
  name: 'index',
  components: {
    watchHeader,
    orderData,
    heatMap,
    countryMap,
    frameBox,
  },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
