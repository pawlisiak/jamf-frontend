<template>

  <div class="l-FormStep">

    <div class="l-FormStep__wrapper">

      <slot/>

    </div>

    <div class="l-FormStep__footer">

      <ui-button
        :callback="() => { return }"
      >
        Cancel
      </ui-button>

      <ui-button
        v-if="!stepIsLast"
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
export default {
  name: 'FormStep',

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
    stepIsLast () {
      return this.index + 1 >= this.count
    }
  },

  methods: {
    goToStep () {
      if (this.getStepValidation()) {
        this.$emit(
          'stepChange',
          this.index + 1
        )
      }
    },

    getStepValidation () {
      let stepIsValid = true

      this.$children.forEach(child => {
        if ('touchControl' in child) {
          child.touchControl()

          if (!child.controlIsValid) {
            stepIsValid = false
          }
        }
      })

      return stepIsValid
    },

    submitForm () {
      if (this.getStepValidation()) {
        this.$emit(
          'submitForm'
        )
      }
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
