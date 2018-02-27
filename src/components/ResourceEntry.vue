<template>
  <div id="resourceEntry">
		<nav-bar></nav-bar>
		<router-view></router-view>
  </div>
</template>

<script>
import navBar from './navBar'

export default {
  components: {
    navBar
  }
}
</script>

<style lang="sass">
#resourceEntry
	width: 100%
	height: 100%
</style>