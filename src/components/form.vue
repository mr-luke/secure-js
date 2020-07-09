<template lang="html">
  <form @submit.prevent="submitForm">
    <div class="row" v-if="isFinished">
        <div class="col-12">
          <div :class="`alert alert-${messageType}`">
            {{ message }}
          </div>
        </div>
    </div>

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

<script lang="ts">
import Vue from 'vue'

// import { FormProperties } from '../contracts/components'
import { HttpCodes, HttpMessages } from '../contracts/services'
import { Repository } from '../services/repository'
import { User } from '../models/user'

export default Vue.extend({
  name: 'Form',
  data: () => {
    return {
      isFormDisabled: false,
      message: null,
      messageType: 'success',
      user: new User()
    }
  },
  computed: {
    isFinished (): boolean {
      return this !== null && this.message !== null &&
        typeof this.message === 'string' && this.message.length > 0
    }
  },
  methods: {
    hasMessage (response: any): boolean {
      return response.data && 'message' in response.data &&
        response.data.message !== undefined
    },
    async submitForm (): Promise<any> {
      const repository: Repository = Repository.createInstnce()
      const response: any = await repository.sendApplication(this.user)

      if (response.status === HttpCodes.Validation) {
        this.messageType = 'warning'
        this.message = this.hasMessage(response) ?
          response.data.message : HttpMessages.Validation
      } else if (response.status !== HttpCodes.Success) {
        this.messageType = 'danger'
        this.message = this.hasMessage(response) ?
          response.data.message : HttpMessages.Error
      } else {
        this.messageType = 'success'
        this.message = this.hasMessage(response) ?
          response.data.message : HttpMessages.Success
      }
    }
  }
})
</script>
