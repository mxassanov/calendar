<template>
  <div>
    <button uk-icon="chevron-left"
            @click="$emit('prevMonth', selectorDate)"></button>
    <span class="uk-text-bold uk-text-center uk-text-uppercase uk-display-inline-block uk-width-small"
          v-text="getMonthTitle()"></span>
    <button uk-icon="chevron-right"
            @click="$emit('nextMonth', selectorDate)"></button>
  </div>
</template>

<script>
export default {
  name: 'month-selector',
  props: ['date'],
  emits: ['prevMonth', 'nextMonth'],
  data() {
    return {
      selectorDate: this.date
    }
  },
  methods: {
    getMonthTitle() {
      return getMonthName(this.selectorDate.getMonth())
    },
  },
  watch: {
    date(newValue) {
      this.selectorDate = newValue
    }
  }
}
</script>