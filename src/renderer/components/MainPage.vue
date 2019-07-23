<template>
  <div id="app">
    <ModalDrawer/>
    <IssueSummary/>
  </div>
</template>

<script>
import IssueSummary from './MainPage/IssueSummary'
import ModalDrawer from './MainPage/ModalDrawer'
  export default {
    name: 'main-page',
    components: { IssueSummary, ModalDrawer }
  }
</script>

<style>
  /* CSS */
</style>
