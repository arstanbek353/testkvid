<template>
  <AppModal v-if="modal" @onClose="onClose" class="modal">
    <TaskCreate @onClose="onClose" :isEditMode="isEditMode" :editingTask="editingTask"/>
  </AppModal>
  <div class="home">
    <div class="container">
      <div class="home__title">Last tasks</div>
      <div class="home__content">
        <TaskItem 
          v-for="task of getLimitedTasksByDate" 
          :key="task.id" 
          :task="task"
          class="home__item"
          @onEdit="onEdit"
        ></TaskItem>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue'
import TaskCreate from '@/components/TaskCreate.vue';
import AppModal from '@/components/AppModal.vue';
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    TaskItem, TaskCreate, AppModal
  },
  data() {
    return {
      modal: false,
      isEditMode: false,
      editingTask: null,
    }
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks
    }),
    ...mapGetters({
      limitedTasks: 'limitedTasks'
    }),
    getLimitedTasksByDate() {
      const sorted = [...this.limitedTasks]
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  methods: {
    onEdit(id) {
      this.isEditMode = true
      this.modal = true
      const task = this.tasks.find(task => task.id == id)
      if (task) {
        this.editingTask = task
      }
    },
    onClose() {
      this.modal = false
      this.isEditMode = false
      this.editingTask = null
    }
  },
}
</script>

<style>
.home {
  padding-top: 15px;
  padding-bottom: 15px;
}
.home__title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}
</style>