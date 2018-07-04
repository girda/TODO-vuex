import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

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

      axios.post('http://localhost:3000/todos', todoItem)
    },
    removeTodo(state, index) {
      axios.delete('http://localhost:3000/todos/' + state.todos[index].id )
      state.todos.splice(index, 1)
    },
    editTodo(state, todo) {
      state.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(state, data) {
      if (data.todo.title.trim() == '') data.todo.title = state.beforeEditCache
      data.todo.editing = false
      axios.put('http://localhost:3000/todos/' + (state.todos[data.index].id), { 'title'    : data.todo.title,
                                                                                 'completed': data.todo.completed,
                                                                                 'editing'  : false})
    },
    cancelEdit(state, todo) {
      todo.title = state.beforeEditCache
      todo.editing = false
    },
    completedTodo(state, data) {
      if ( data.todo.completed === false) {
        data.todo.completed = true
        axios.put('http://localhost:3000/todos/' + state.todos[data.index].id, { 'title'    : data.todo.title,
                                                                                 'completed': data.todo.completed,
                                                                                 'editing'  : false})
      } else {
        data.todo.completed = false
        axios.put('http://localhost:3000/todos/' + state.todos[data.index].id, { 'title'    : data.todo.title,
                                                                                 'completed': data.todo.completed,
                                                                                 'editing'  : false})
      }
    },
    checkAllTodos(state) {
      state.todos.forEach( todo => todo.completed = event.target.checked )

      for ( let i = 0; i < state.todos.length; i++ ) {
        if ( state.todos[i].completed === true ) {
          axios.put('http://localhost:3000/todos/' + state.todos[i].id, { 'title'    : state.todos[i].title,
                                                                          'completed': state.todos[i].completed,
                                                                          'editing'  : false})
        } else {
          axios.put('http://localhost:3000/todos/' + state.todos[i].id, { 'title'    : state.todos[i].title,
                                                                          'completed': state.todos[i].completed,
                                                                          'editing'  : false})
        }
      }
    },
    clearCompleted(state) {
      for ( let i = 0; i < state.todos.length; i++ ) {
        if ( state.todos[i].completed === true ) {
          axios.delete('http://localhost:3000/todos/' + state.todos[i].id )
        }
      }
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateTodos(state, todos) {
      state.todos = todos
    }
  },
  actions: {
    async created(context) {
      const {data} = await axios.get('http://localhost:3000/todos')
      context.commit('updateTodos', data)
    }
  }
})

export default store