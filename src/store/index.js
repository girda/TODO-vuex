import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    idForTodo: parseInt((new Date().getTime() + Math.random())).toString(),
    newTodo: '',
    beforeEditCache: '',
    filter: 'all',
    todos: []
  },
  mutations: {
    addTodo(state) {
      if (state.newTodo.trim().length == 0) return

      let todoItem = {
        id: state.idForTodo,
        title: state.newTodo,
        completed: false,
        editing: false
      }

      state.newTodo = ''
      state.idForTodo++

      let currentId = {id: state.idForTodo}

      state.todos.push(todoItem)
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1)
    },
    editTodo(state, todo) {
      state.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(state, todo) {
      if (todo.title.trim() == '') todo.title = state.beforeEditCache
      todo.editing = false
    },
    cancelEdit(state, todo) {
      todo.title = state.beforeEditCache
      todo.editing = false
    },
    completedTodo(todo) {
      if ( todo.completed === false) {
        todo.completed = true
      } else {
        todo.completed = false
      }
    },
    checkAllTodos(state) {
      state.todos.forEach( todo => todo.completed = event.target.checked )
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  }
})

export default store