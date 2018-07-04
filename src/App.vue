<template>
  <div id="app" class="container">
    
    <img src="./assets/logo.png" class="logo">

    <TodoList/>

  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  },
}
</script>

<style lang="sass">
* 
  box-sizing: border-box

#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #34495e
  margin-top: 60px
  font-size: 24px

.container 
  max-width: 600px
  margin: 0 auto

.logo 
  display: block
  margin: 20px auto
  height: 75px

</style>
