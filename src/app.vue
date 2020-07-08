<template>
  <div id="app" class="container">
    <h1 class="text-center text-uppercase mb-3">Interview application form</h1>
    <div class="card shadow">
      <div class="card-body">
        <Form />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Form from './components/form.vue'

export default Vue.extend({
  name: 'App',
  components: { Form }
});
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
