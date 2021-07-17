<template>
  <div class="uk-container container">
    <div class="uk-margin-small uk-margin-small-top uk-flex uk-flex-middle">
      <a class="uk-icon-button uk-margin-medium-right" uk-icon="list"
         @click.prevent="showTasksList = [...tasks]"
      ></a>
      <month-selector
          class="uk-margin-medium-right"
          :date="selectorDate"
          @prev-month="changeDateMonth($event, -1)"
          @next-month="changeDateMonth($event,1)"
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
      <div v-for="(_, i) in 7" v-text="weekdayName(i)" class="calendar-item uk-text-center"></div>
      <div v-for="day in days" class="calendar-item">
        <calendar-item :date="day"
                       v-if="day"
                       @add-task="newTask = {initDate: day}"
                       :tasks="taskIndex[getIndexKey(day)]"
                       :set-edit-task="setEditTask"
                       @show-tasks-change="showTasksChange"
        ></calendar-item>
      </div>
      <task-form
          :new-task="newTask"
          :add-task="addTask"
          :edit-task="editTask"
          :update-task="updateTask"
          :new-task-obj="newTaskObj"
          :remove-task="removeTask"
      >
      </task-form>
      <tasks-list
          :tasks="showTasksList"
          :set-edit-task="setEditTask"
      ></tasks-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      days: [],
      selectorDate: new Date(),
      newTask: null,
      tasks: this.loadTasksFromStore(),
      taskIndex: null,
      editTask: null,
      showTasksList: []
    }
  },
  watch: {
    tasks: {
      immediate: true,
      handler() {
        const taskIndex = {}
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i]
          const key = this.getIndexKey(task.date)
          const tasksForDay = taskIndex[key] || []
          tasksForDay.push(task)
          tasksForDay.sort(this.sortTasks)
          taskIndex[key] = tasksForDay
        }
        this.taskIndex = taskIndex
      }
    },
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
      const task = this.newTaskObj(null)
      this.updateTaskWithData(formModel, task)

      this.tasks = this.tasks.concat([task])
      this.saveTasksToStore(this.tasks)
    },
    updateTask(formModel, task) {
      this.updateTaskWithData(formModel, task)
      this.tasks = this.tasks.concat([])
      this.saveTasksToStore(this.tasks)
    },
    updateTaskWithData(formModel, task) {
      const taskDate = new Date(formModel.date)
      taskDate.setHours(formModel.hours)
      taskDate.setMinutes(formModel.minutes)

      task.date = taskDate
      task.title = formModel.title
      task.description = formModel.description
      task.finished = formModel.finished
    },
    sortTasks(a, b) {
      return a.date.getTime() - b.date.getTime()
    },
    getIndexKey(date) {
      return date.toLocaleDateString()
    },
    saveTasksToStore(tasks) {
      const str = JSON.stringify(tasks)
      localStorage.setItem('tasks', str)
    },
    loadTasksFromStore() {
      let tasks = []
      try {
        tasks = JSON.parse(localStorage.getItem('tasks')) || []
      } catch (e) {
        console.error(e)
      }
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        task.date = new Date(task.date)
      }

      return tasks
    },
    setEditTask(task) {
      this.editTask = {task}
    },
    removeTask(task) {
      const index = this.tasks.indexOf(task)
      if (index < 0) {
        console.error('failed to remove task' + task)
        return
      }
      this.tasks.splice(index, 1)
      this.tasks = this.tasks.concat([])
      this.saveTasksToStore(this.tasks)
    },
    showTasksChange(value) {
      this.showTasksList = value
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
.container {
  height: 100vh;
}
.calendar-item {
  width: calc(100% / 7)
}
</style>
