<template>
  <div class="uk-card uk-card-small uk-card-hover uk-margin-small-top" :class="itemClasses">
    <div class="uk-card-header">
      <div class="uk-card-title">
        <button class="uk-icon-link" uk-icon="file-edit"
                @click="$emit('addTask')"
        >
        </button>
        <span class="uk-float-right uk-text-bold" v-text="date.getDate()"></span>
      </div>

      <div v-if="tasks?.length" class="uk-card-body">
        <ul class="uk-list">
          <li v-for="task in limitTasks()">
            <div class="uk-text-truncate">
              <a
                  :title="task.title"
                  @click.prevent="setEditTask(task)"
                  :class="getTitleClasses(task)"
                  v-text="task.title"
              ></a>
            </div>
          </li>
          <li class="show-all-tasks" v-show="tasks.length > maxTasks">
            <a class="uk-badge" @click.prevent="showTasksFn" v-text="tasks.length"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar-item',
  props: ['date', 'tasks', 'setEditTask'],
  emits: ['addTask', 'showTasksChange'],
  data() {
    return {
      maxTasks: 2,
      taskFinishedTitle: {
        'uk-text-muted': true,
        'text-line-through': true
      },
      showTasksItems: []
    }
  },
  computed: {
    itemClasses() {
      const isCurrentDate = getISODate(new Date()) === getISODate(this.date)
      return {
        'uk-card-primary': isCurrentDate,
        'uk-card-default': !isCurrentDate,
      }
    }
  },
  methods: {
    limitTasks() {
      return this.tasks && this.tasks.slice(0, this.maxTasks)
    },
    getTitleClasses(task) {
      if (task.finished) return this.taskFinishedTitle
    },
    showTasksFn() {
      this.showTasksItems = this.tasks.concat([])
      this.$emit('showTasksChange', this.showTasksItems)
    }
  },
}
</script>

<style scoped>
.show-all-tasks {
  position: absolute;
  top: 38px;
  left: 20px;
}

.text-line-through {
  text-decoration: line-through;
}
</style>
