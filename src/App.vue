<template>
  <div id="app">
    <div style="width: 500px; margin: 0 auto">
      <Calendar lang='ja' mode='mon' type='square' border @onDateSelect="handleDateSelect">
        <!-- <span slot="last-month-wrap">上</span>
        <span slot="next-month-wrap">下</span> -->
      </Calendar>
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar'
export default {
  name: 'App',
  methods: {
    handleDateSelect (val) {
      console.log(val)
    }
  },
  components: {
    Calendar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
