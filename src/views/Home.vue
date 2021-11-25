<template>
  <div>
    <h1>ToDoリスト</h1>
    <form>
      <input type="radio" name="status" id="all" v-model="picked" value="all">
      <label for="all">すべて</label>
      <input type="radio" name="status" id="working" v-model="picked" value="working">
      <label for="working">作業中</label>
      <input type="radio" name="status" id="done" v-model="picked" value="done">
      <label for="done">完了</label>
    </form>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" v-bind:key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.content }}</td>
          <td><button @click="changeStatus(task.id)">{{ task.status }}</button></td>
          <td><button @click="deleteTask(task.id)">削除</button></td>
        </tr>
      </tbody>
    </table>
    <h2>新規タスクの追加</h2>
    <form>
      <input type="text" name="newTask" v-model="taskInput">
      <button @click.prevent="addNewTask(taskInput)">追加</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskInput: '',
      picked: 'all',
    }
  },
  methods: {
    addNewTask(taskInput) {
      this.$store.dispatch('commitTask', taskInput),
      this.taskInput = ''
    },
    changeStatus(taskId) {
      this.$store.dispatch('commitChangeStatus', taskId)
    },
    deleteTask(taskId) {
      this.$store.dispatch('commitDelete', taskId),
      this.$store.dispatch('commitRenumber')
    }
  },
  computed: {
    tasks() {
      if (this.picked === 'all') {
        return this.$store.getters.getAllTasks
      } else if (this.picked === 'working') {
        return this.$store.getters.getWorkingTasks
      } else {
        return this.$store.getters.getDoneTasks
      }
    },
  }
}
</script>
