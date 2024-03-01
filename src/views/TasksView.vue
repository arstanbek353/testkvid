<template>
  <AppModal v-if="modal" @onClose="onClose" class="modal">
    <TaskCreate @onClose="onClose" :isEditMode="isEditMode" :editingTask="editingTask"/>
  </AppModal>
  <div class="tasks">
    <div class="container">
      <div class="tasks__top">
        <div class="tasks__title">All tasks</div>
        <select 
          v-model="selectedPriiority"
          class="select"
        >
          <option v-for="(item, index) of prioritySortOptions" :key="item" :value="index">{{ item }}</option>
        </select>
        <select 
          v-model="selectedStatus"
          class="select"
        >
          <option v-for="(item, index) of statusSortOptions" :key="item" :value="index">{{ item }}</option>
        </select>
        <button class="btn btn--primary" @click="modal = true">New task</button>
      </div>
      <TaskItem 
        v-for="task of getSortedTasks" 
        :key="task.id" 
        :task="task"
        @onEdit="onEdit"
      ></TaskItem>
      <div v-if="!getSortedTasks.length" class="tasks__zero">0 task</div>
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue'
import TaskCreate from '@/components/TaskCreate.vue';
import AppModal from '@/components/AppModal.vue';
import { mapState } from 'vuex'
import { PRIORITY, ALL } from '@/types';

export default {
  components: {
    TaskItem, TaskCreate, AppModal
  },
  data() {
    return {
      modal: false,
      isEditMode: false,
      editingTask: null,
      selectedPriiority: ALL,
      selectedStatus: ALL,
      prioritySortOptions: {
        all: ALL,
        ...PRIORITY
      },
      statusSortOptions: {
        all: ALL,
        completed: 'completed',
        favorite: 'favorite',
      }
    }
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
  computed: {
    ...mapState({
      tasks: state => state.tasks
    }),
    getSortedTasksByPriority() {
      if (this.selectedPriiority === ALL) {
        return this.tasks
      }
      return this.tasks.filter(task => this.selectedPriiority == task.priority)
    },
    getSortedTasksByStatus() {
      if (this.selectedStatus === ALL) {
        return this.getSortedTasksByPriority
      }
      return this.getSortedTasksByPriority.filter(task => task[this.selectedStatus])
    },
    getSortedTasks() {
      return this.getSortedTasksByStatus
    }
  }
}
</script>

<style>
.tasks {
  padding-top: 30px;
}
.tasks__top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 12px;
}
.tasks__title {
  font-size: 20px;
  font-weight: 700;
  margin-right: auto;
}
.tasks__zero {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  padding: 20px;
}
</style>