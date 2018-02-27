<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  z-index: 1
  width: 100%
  height: 100%
html
  height: 100%
  font-size: 625%
body
  min-width: 13rem
  height: 100%
  margin: 0
  font-family: 'Microsoft YaHei'
  overflow: auto
.ns 
  user-select: none
ul,p
  list-style: none
  margin: 0
  padding: 0
.clearfix
  &:before,&:after
    content: ''
    display: table
  &:after
    clear: both
</style>
