<template>
  <div class="create" @keydown.enter="handleKeyDown">
    <form class="create__form" @submit.prevent="onSubmit">
      <div class="create__top">
        <input 
          type="text" 
          v-model="task.title"
          class="create__input create__input--title"
          placeholder="Title"
          ref="title"
        >
        <select 
          v-model="task.priority"
          class="select create__select"
        >
          <option v-for="(p, index) of priority" :key="p" :value="index">{{ p }}</option>
        </select>
      </div>
      <textarea 
        v-model="task.description"
        class="create__textarea"
        placeholder="Description"
        ref="description"
      ></textarea>
      <div class="create__bot">
        <button v-if="getIsEditMode" class="create__btn">Edit task</button>
        <button v-else class="create__btn">Create task</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { PRIORITY } from '@/types';
export default {
  props: {
    isEditMode: Boolean,
    editingTask: Object || null,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        priority: 0,
      },
      priority: PRIORITY,
    }
  },
  computed: {
    getIsEditMode() {
      return this.editingTask && this.isEditMode
    }
  },
  methods: {
    ...mapActions({
      fetchCreateTask: 'fetchCreateTask',
      fetchUpdateTask: 'fetchUpdateTask',
    }),
    onSubmit() {
      if (!this.task.title) {
        this.$refs.title.focus()
        return null
      }
      if (!this.task.description) {
        this.$refs.description.focus()
        return null
      }
      if (this.getIsEditMode) {
        this.fetchUpdateTask(this.task)
      } else {
        this.fetchCreateTask(this.task)
      }
      this.$emit('onClose')
    },
    handleKeyDown(e) {
      if (e.key === 'Enter') {
        this.onSubmit();
      }
    },
  },
  mounted() {
    this.$refs.title.focus()
    if (this.getIsEditMode) {
      this.task = {...this.editingTask}
    }
  }
}
</script>

<style>
.create {
  margin-bottom: 20px;
}
.create__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.create__input {
  padding: 10px 16px;
  height: 35px;
  border: none;
  background-color: #F0F0F0;
  border-radius: 10px;
  flex-grow: 1;
}
.create__textarea {
  padding: 10px 16px;
  height: 200px;
  width: 100%;
  border: none;
  background-color: #F0F0F0;
  border-radius: 10px;
}
.create__bot {
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
}
.create__btn {
  padding: 10px 15px;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: #4577EF;
  color: #fff;
}
</style>