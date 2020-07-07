<template>
  <div id="app" class="container">
    <div class="row mb-3">
      <div class="col-12">
        <h1 class="text-center text-uppercase">Interview application form</h1>
      </div>
    </div>

    <div class="card shadow">
      <div class="card-body">
        <Form />
      </div>
    </div>
  </div>
</template>

<script>
import Form from './components/form.vue'

export default {
  name: 'App',
  components: { Form }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
