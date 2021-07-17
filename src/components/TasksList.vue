<template>
  <div id="tasks-list" uk-modal>
    <div class="uk-modal-dialog uk-modal-body" uk-overflow-auto>
      <h2 class="uk-modal-title">Список задач</h2>
      <ul class="uk-list uk-list-divider">
        <li v-for="task in tasks">
          <a @click.prevent="setEditTask(task)" v-text="task.title"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tasks-list',
  props: ['tasks', 'setEditTask'],
  mounted() {
    this.modal = UIkit.modal('#tasks-list')
  },
  watch: {
    tasks() {
      this.modal.show()
    }
  }
}
</script>
