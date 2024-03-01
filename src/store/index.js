import { createStore } from 'vuex'
import axios from '@/http'
// Create a new store instance.
const store = createStore({
  state () {
    return {
      tasks: [],
    }
  },
  getters: {
    limitedTasks(state) {
      return state.tasks?.length > 5 ? state.tasks.slice(0, 5) : state.tasks
    }
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload
    },
    addTask(state, payload) {
      state.tasks.push(payload)
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTask(state, payload) {
      const taskIndex = state.tasks.findIndex(task => task.id === payload.id)
      if (taskIndex >= 0) {
        const task = state.tasks[taskIndex]
        state.tasks[taskIndex] = {...task, ...payload}
      }
    },
  },
  actions: {
    async fetchGetTasks({commit}) {
      try {
        const response = await axios.get('/items')
        commit('setTasks', response?.data)
      } catch(e) {
        console.error(e)
      }
    },
    async fetchCreateTask({commit}, task) {
      try {
        const newTask = {
          ...task,
          id: String(Date.now()),
          date: String(new Date()),
          priority: +task.priority,
          completed: false,
          favorite: false
        }
        const response = await axios.post('/items', newTask)
        
        if (response) {
          commit('addTask', newTask)
        }
      } catch(e) {
        console.error(e)
      }
    },
    async fetchDeleteTask({commit}, id) {
      try {
        const response = await axios.delete(`/items/${id}`)
        
        if (response) {
          commit('deleteTask', id)
        }
      } catch(e) {
        console.error(e)
      }
    },
    async fetchUpdateTask({commit}, data) {
      try {
        const response = await axios.patch(`/items/${data.id}`, data)
        
        if (response) {
          commit('updateTask', data)
        }
      } catch(e) {
        console.error(e)
      }
    },
  }
})

export default store