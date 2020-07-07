<template lang="html">
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" name="email" v-model="user.email" class="form-control" id="email">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="first">First name</label>
          <input type="text" name="first" v-model="user.firstName" class="form-control" id="first">
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="last">Last name</label>
          <input type="text" name="last" v-model="user.lastName" class="form-control" id="last">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="about">Tell us about yourself</label>
          <textarea name="about" v-model="user.about" class="form-control" rows="8" id="about"></textarea>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 text-align">
        <button type="submit" class="btn btn-success" :disabled="isFormDisabled">Apply form</button>
      </div>
    </div>
  </form>
</template>

<script>
import config from '../config'
import { Repository } from '../services/repository'
import { User } from '../models/user'

/**
 * @TODO
 */
export default {
  name: 'Form',
  data () {
    return {
      isFormDisabled: false,
      user: new User()
    }
  },
  methods: {
    async submitForm () {
      const repository = new Repository(config)

      await repository.sendApplication(this.user)
    }
  }
}
</script>
