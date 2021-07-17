<template>
  <form uk-modal id="task-form" ref="form"
        @submit.prevent="save">
    <div class="uk-modal-dialog" uk-overflow-auto>
      <div class="uk-modal-header">
        <h2 class="uk-modal-title" v-if="isEditMode()">Редактировать задачу</h2>
        <h2 class="uk-modal-title" v-else>Добавить задачу</h2>
      </div>
      <div class="uk-modal-body">
        <div class="uk-form-horizontal uk-margin-small">

          <div class="uk-margin">
            <label class="uk-form-label" for="task-title">Заголовок задачи</label>
            <div class="uk-form-controls">
              <input v-model="formModel.title" type="text" class="uk-input" id="task-title" required>
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="task-desc">Описание задачи</label>
            <div class="uk-form-controls">
              <textarea v-model="formModel.description" class="uk-textarea" id="task-desc"></textarea>
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="task-date">Дата исполнения</label>
            <div class="uk-form-controls">
              <input v-model="formModel.date" type="date" class="uk-input uk-width-1-2" id="task-date" required>
              <input v-model="formModel.hours"
                     type="number" min="0" max="23" class="uk-input uk-width-1-4" required>
              <input v-model="formModel.minutes"
                     type="number" min="0" max="59" class="uk-input uk-width-1-4" required>
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label">Закончена</label>
            <div class="uk-form-controls uk-form-controls-text">
              <label>
                <input v-model="formModel.finished" type="radio" class="uk-radio" name="finished" :value="true">
                Да
              </label>
              <br>
              <label>
                <input v-model="formModel.finished" type="radio" class="uk-radio" name="finished" :value="false">
                Нет
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="uk-modal-footer uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
        <button class="uk-button uk-button-danger" type="button"
                v-if="isEditMode()" @click="removeTaskForm"
        >Удалить
        </button>
        <button class="uk-button uk-button-primary" type="submit"
                :disabled="!$refs.form?.checkValidity()"
        >
          Сохранить
        </button>
      </div>

    </div>
  </form>
</template>

<script>
export default {
  name: 'task-form',
  props: ['newTask', 'addTask', 'editTask', 'updateTask', 'newTaskObj', 'removeTask'],
  data() {
    return {
      formModel: {},
      actionType: '',
      addType: 'add',
      editType: 'edit',
    }
  },
  watch: {
    newTask() {
      const date = new Date(this.newTask.initDate)
      const currentDate = new Date()
      date.setMinutes(currentDate.getMinutes())
      date.setHours(currentDate.getHours())
      const emptyTask = this.newTaskObj(date)
      this.openFormForModel(this.addType, emptyTask)
    },
    editTask() {
      this.openFormForModel(this.editType, this.editTask.task)
    }
  },
  mounted() {
    this.form = UIkit.modal('#task-form')
  },
  methods: {
    save() {
      switch (this.actionType) {
        case this.addType:
          this.addTask(this.formModel)
          break
        case this.editType:
          this.updateTask(this.formModel, this.editTask.task)
          break
        default:
          console.error('unsupported form mode: ' + this.actionType)
      }
      this.form.hide()
    },
    isEditMode() {
      return this.actionType === this.editType
    },
    initFormModel(model) {
      this.formModel = {
        title: model.title,
        description: model.description,
        date: getISODate(model.date),
        hours: model.date.getHours(),
        minutes: model.date.getMinutes(),
        finished: model.finished
      }
    },
    async openFormForModel(actionType, model) {
      this.actionType = actionType
      this.initFormModel(model)
      this.form.show()
      await this.$nextTick()
      this.$forceUpdate()
    },
    removeTaskForm() {
      this.removeTask(this.editTask.task)
      this.form.hide()
    }
  }
}
</script>
