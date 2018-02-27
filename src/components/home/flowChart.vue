<template>
  <main id="flow-wrapper">
    <section id="canvas-wrapper"></section>
  </main>
</template>
<script>
import { FlowChart } from './FlowChart.js'

export default {
  data() {
    return {
      list: {}
    }
  },
  mounted() {
    this.$http.get('/static/json/requestData.json')
      .then(response => {
        let data = response.data;
        if(!data)
          return;
        let flowChart = new FlowChart(1000, 600);
        flowChart.init("#canvas-wrapper", data.list);
      });
  }
}
</script>

<style lang="sass">
  #flow-wrapper
    width: 100%
    height: calc(100% - .5rem)
    position: relative
    background: url(/static/img/home/home_bg.png) no-repeat
    background-size: 100%
  #canvas-wrapper
    width: 1000px
    height: 600px
    position: absolute
    top: 50%
    left: 50%
    margin-left: -500px
    margin-top: -300px
</style>
