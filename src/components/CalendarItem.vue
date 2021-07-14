<template>
  <div class="uk-card uk-card-small uk-card-hover uk-margin-small-top" :class="itemClasses">
    <div class="uk-card-header">
      <div class="uk-card-title">
        <button class="uk-icon-link" uk-icon="file-edit"></button>
        <span class="uk-float-right uk-text-bold" v-text="date.getDate()"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar-item',
  props: ['date'],
  computed: {
    itemClasses() {
      const isCurrentDate = getISODate(new Date()) === getISODate(this.date)
      return {
        'uk-card-primary': isCurrentDate,
        'uk-card-default': !isCurrentDate,
      }
    }
  }
}
</script>

