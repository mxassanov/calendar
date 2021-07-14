<template>
  <div>
    <button class="uk-margin-small-right" uk-icon="chevron-left"
            @click="$emit('prevYear', selectorDate)"></button>
    <span class="uk-text-bold uk-text-center uk-text-uppercase uk-display-inline-block uk-width-small"
          v-text="getYearTitle()"></span>
    <button class="uk-margin-small-left" uk-icon="chevron-right"
            @click="$emit('nextYear', selectorDate)"></button>
  </div>
</template>

<script>
export default {
  name: 'year-selector',
  props: ['date'],
  emits: ['prevYear', 'nextYear'],
  data() {
    return {
      selectorDate: this.date
    }
  },
  methods: {
    getYearTitle() {
      return getYearName(this.selectorDate.getFullYear())
    }
  },
  watch: {
    date(newValue) {
      this.selectorDate = newValue
    }
  }
}
</script>