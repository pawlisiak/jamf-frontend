<template>

  <div class="l-FormStep">

    <div class="l-FormStep__wrapper">

      <slot/>

    </div>

    <div class="l-FormStep__footer">

      <ui-button
        :callback="resetForm"
      >
        Cancel
      </ui-button>

      <ui-button
        v-if="!isStepLast"
        :callback="goToStep"
        priority="secondary"
      >
        Next
      </ui-button>

      <ui-button
        v-else
        :callback="submitForm"
        priority="primary"
      >
        Submit
      </ui-button>

    </div>

  </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Form_Step',

  props: {
    index: {
      type: Number,
      required: true
    },

    count: {
      type: Number,
      required: true
    }
  },

  computed: {
    isStepLast () {
      return this.index + 1 >= this.count
    }
  },

  methods: {
    ...mapActions('App', {
      commitNotification: 'commitNotification'
    }),

    goToStep () {
      if (this.getStepValidation()) {
        this.$emit(
          'stepChange',
          this.index + 1
        )
      } else {
        this.commitNotification(
          'Something\'s wrong with this step. Please correct it.'
        )
      }
    },

    getStepValidation () {
      let isStepValid = true

      this.$children.forEach(child => {
        if ('touchControl' in child) {
          child.touchControl()

          if (!child.isControlValid) {
            isStepValid = false
          }
        }
      })

      return isStepValid
    },

    submitForm () {
      if (this.getStepValidation()) {
        this.$emit(
          'submitForm'
        )
      }
    },

    resetForm () {
      this.$emit(
        'resetForm'
      )
    }
  }
}
</script>

<style lang="scss">
.l-FormStep {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  &__wrapper {
    flex-grow: 1;
  }

  &__footer {
    flex-grow: 0;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    .u-Button {
      margin-left: 12px;
    }
  }
}
</style>
