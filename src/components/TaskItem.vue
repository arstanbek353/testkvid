<template>
  <div class="task">
    <div class="task__top">
      <div class="task__date">{{ new Date(task.date).toDateString() }}</div>
      <div 
        class="tag"
        :class="`tag--` + priorityClass"
      >{{ priorityClass }}</div>
    </div>
    <div class="task__content">
      <div class="task__title">{{ task.title }}</div>
      <div class="task__description">{{ task.description }}</div>
    </div>
    <div class="task__actions">
      <div class="task__actions-left">
        <button 
          class="btn btn--danger"
          @click="onDeleteTask"
        >
          Delete
        </button>
        <button 
          class="btn btn--primary"
          @click="onEditTask"
        >
          Edit
        </button>
      </div>
      <div class="task__actions-right">
        <button 
          class="btn btn--secondary"
          :class="{'btn--active': task.favorite}"
          @click="onFavoriteTask"
        >
          Favorite
        </button>
        <button 
          class="btn btn--secondary"
          :class="{'btn--active': task.completed}"
          @click="onCompleteTask"
        >
          Finish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { PRIORITY } from '@/types';

export default {
  name: 'TaskItem',
  props: {
    task: Object,
  },
  computed: {
    priorityClass() {
      const key = this.task.priority 
      return PRIORITY[key]
    }
  },
  methods: {
    ...mapActions({
      fetchDeleteTask: 'fetchDeleteTask',
      fetchUpdateTask: 'fetchUpdateTask',
    }),
    onDeleteTask() {
      this.fetchDeleteTask(this.task.id)
    },
    onFavoriteTask() {
      this.fetchUpdateTask({
        ...this.task,
        favorite: !this.task.favorite
      })
    },
    onCompleteTask() {
      this.fetchUpdateTask({
        ...this.task,
        completed: !this.task.completed
      })
    },
    onEditTask() {
      this.$emit('onEdit', this.task.id)
    },
  }
}
</script>

<style>
.task {
  padding: 20px;
  border-radius: 25px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 20px;
}
.task__top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}
.task__date {
  font-size: 16px;
  padding: 8px 12px;
  background-color: #F0F0F0;
  border-radius: 25px;
}
.task__content {
  padding: 5px 0;
}
.task__title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 12px;
}
.task__description {
  font-size: 14px;
  color: #8A8F9B;
  margin-bottom: 20px;
}
.task__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}
.task__actions-left, 
.task__actions-right {
  display: flex;
  gap: 10px;
}
</style>
