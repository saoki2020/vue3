import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, taskInput) {
      state.tasks.push({
        id: state.tasks.length,
        content: taskInput,
        status: '作業中'
      })
    },
    deleteTask(state, taskId) {
      state.tasks.splice(taskId, 1)
    },
    renumberTask(state) {
      for(let i = 0; i < state.tasks.length; i++) {
        state.tasks[i].id = i
      }
    },
    changeStatus(state, taskId) {
      if (state.tasks[taskId].status === '作業中') {
        state.tasks[taskId].status = '完了'
      } else {
        state.tasks[taskId].status = '作業中'
      }
    },
  },
  getters: {
    getAllTasks(state) {
      return state.tasks
    },
    getWorkingTasks(state) {
      return state.tasks.filter(task => task.status === '作業中')
    },
    getDoneTasks(state) {
      return state.tasks.filter(task => task.status === '完了')
    },
  },
  actions: {
    commitTask({commit}, taskInput) {
      commit('addTask', taskInput)
    },
    commitDelete({commit}, taskId) {
      commit('deleteTask', taskId)
    },
    commitRenumber({commit}) {
      commit('renumberTask')
    },
    commitChangeStatus({commit}, taskId) {
      commit('changeStatus', taskId)
    }
  },
  modules: {
  }
})
