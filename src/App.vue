<template>
  <div class="uk-container uk-container-large">
    <div class="uk-flex uk-flex-wrap">
      <div v-for="(_, day) in 7" v-text="day" class="calendar-item"></div>
      <div v-for="day in days" v-text="day" class="calendar-item"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    const currentDate = new Date()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const days = getDaysOfMonth(month, year)
    return {
      days
    }
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .calendar-item {
    width: calc(100% / 7)
  }
</style>
