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
          <span class="text-danger" v-if="hasError('email')">{{ firstError('email') }}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="first">First name</label>
          <input type="text" name="first" v-model="user.firstName" class="form-control" id="first">
          <span class="text-danger" v-if="hasError('firstName')">{{ firstError('firstName') }}</span>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="last">Last name</label>
          <input type="text" name="last" v-model="user.lastName" class="form-control" id="last">
          <span class="text-danger" v-if="hasError('lastName')">{{ firstError('lastName') }}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="about">Tell us about yourself</label>
          <textarea name="about" v-model="user.about" class="form-control" rows="8" id="about"></textarea>
          <span class="text-danger" v-if="hasError('about')">{{ firstError('about') }}</span>
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
import { createRepositoryInstance } from '../services/repository'
import { User } from '../models/user'

const FAIL_FALLBACK_MSG = 'Upss... sth went wrong.'
const SUCCESS_CODE = 200
const SUCCESS_FALLBACK_MSG = 'Ok. Everything\'s fine.'
const VALIDATION_CODE = 422

export default {
  name: 'Form',
  data () {
    return {
      isFormDisabled: false,
      message: null,
      messageType: 'success',
      user: new User(),
      validationErrors: {}
    }
  },
  computed: {
    isFinished () {
      return this.message !== null && this.message.length > 0
    }
  },
  methods: {
    firstError (fieldName) {
      return this.validationErrors[fieldName]
    },
    hasError (fieldName) {
      return Object.values(this.validationErrors).length > 0 &&
        Object.prototype.hasOwnProperty.call(this.validationErrors, fieldName)
    },
    hasErrors (response) {
      return this.isResponseCorrect(response) && this.hasProperty(response.data, 'errors') &&
        typeof response.data.errors === 'object' && response.data.errors !== null
    },
    hasMessage (response) {
      return this.isResponseCorrect(response) && this.hasProperty(response.data, 'message')
    },
    hasProperty (data, property) {
      return Object.prototype.hasOwnProperty.call(data, property) && data[property] !== undefined
    },
    isResponseCorrect (response) {
      return typeof response.data === 'object' && response.data !== null
    },
    async submitForm () {
      const repository = createRepositoryInstance()
      const response = await repository.sendApplication(this.user)

      if (response.status === VALIDATION_CODE) {
        this.messageType = 'warning'
        this.message = this.hasMessage(response) ? response.data.message : FAIL_FALLBACK_MSG

        if (this.hasErrors(response)) {
          this.validationErrors = response.data.errors
        }
      } else if (response.status !== SUCCESS_CODE) {
        this.messageType = 'danger'
        this.message = this.hasMessage(response) ? response.data.message : FAIL_FALLBACK_MSG
      } else {
        this.messageType = 'success'
        this.message = this.hasMessage(response) ? response.data.message : SUCCESS_FALLBACK_MSG
      }
    }
  }
}
</script>
