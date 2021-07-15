<template>
  <div class="uk-container ">
    <div class="uk-margin-small uk-margin-top uk-flex">
      <month-selector
          :date="selectorDate"
          @prev-month="changeDateMonth($event, -1)"
          @next-month="changeDateMonth($event,1)"
          class="uk-margin-medium-right"
      >
      </month-selector>
      <year-selector
          :date="selectorDate"
          @prev-year="changeDateYear($event, -1)"
          @next-year="changeDateYear($event, 1)"
      >
      </year-selector>
    </div>
    <div class="uk-flex uk-flex-wrap">
      <div v-for="(_, i) in 7" v-text="weekdayName(i)" class="calendar-item"></div>
      <div v-for="day in days" class="calendar-item">
        <calendar-item :date="day"
                       v-if="day"
                       @add-task="newTask = {initDate: day}"
        ></calendar-item>
      </div>
      <task-form
          :new-task="newTask"
          :add-task="addTask"
      >
      </task-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selectorDate: new Date(),
      newTask: null,
      tasks: [],
    }
  },
  watch: {
    selectorDate: {
      immediate: true,
      handler() {
        const currentDate = this.selectorDate
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()
        const daysInMonth = getDaysCountOfMonth(month, year)
        const firstDayIndex = getFirstDay(month, year)
        const days = []

        for (let i = firstDayIndex; i < daysInMonth + firstDayIndex; i++) {
          days[i] = new Date(year, month, i + 1 - firstDayIndex)
        }
        this.days = days
      }
    }
  },
  methods: {
    weekdayName(i) {
      return getWeekdayName(i).toUpperCase()
    },
    changeDateMonth(date, diff) {
      const d = new Date(date)
      d.setMonth(d.getMonth() + diff)
      this.selectorDate = d
    },
    changeDateYear(date, diff) {
      const d = new Date(date)
      d.setFullYear(d.getFullYear() + diff)
      this.selectorDate = d
    },
    newTaskObj(date) {
      return {
        date
      }
    },
    addTask(formModel) {
      const date = new Date(formModel.date)
      date.setHours(formModel.hours)
      date.setMinutes(formModel.minutes)

      const task = this.newTaskObj(date)
      task.title = formModel.title
      task.description = formModel.description
      task.finished = formModel.finished

      this.tasks = this.tasks.concat([task])
    }
  },
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
