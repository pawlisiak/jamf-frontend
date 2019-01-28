<template>

  <form class="l-Form">

    <l-form-step
      v-for="(step, index) in model"
      :key="index"
      v-show="stepIsActive(index)"
      @stepChange="stepChange"
      @submitForm="submitForm"
      @resetForm="openResetFormDialog"
      :index="index"
      :count="model.length"
    >

      <div
        v-if="step.intro"
        v-html="step.intro"
      ></div>

      <l-form-field
        v-for="control in step.controls"
        :key="control.name"
        v-model="values[control.name]"
        ref="control"
        :control="control"
      />

      <div
        v-if="step.outro"
        v-html="step.outro"
      ></div>

    </l-form-step>

    <!-- Reset form dialog: start -->

      <l-modal
        ref="modal"
        heading="Are you sure?"
      >

        <p>Are you sure you want to reset the form?<br>Click 'Ok' to erase all the form data!</p>

        <footer class="l-Form__dialogFooter">

          <ui-button
            :callback="closeResetFormDialog"
          >
            Cancel
          </ui-button>

          <ui-button
            priority="primary"
            :callback="resetForm"
          >
            Ok
          </ui-button>

        </footer>

      </l-modal>

    <!-- Reset form dialog: end -->

  </form>

</template>

<script>
export default {
  name: 'Form',

  props: {
    model: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      activeStep: 0,

      values: {}
    }
  },

  watch: {
    activeStep (val) {
      this.$emit(
        'stepChange',
        val
      )
    }
  },

  methods: {
    stepIsActive (step) {
      return step === this.activeStep
    },

    stepChange (payload) {
      this.activeStep = payload
    },

    submitForm () {
      console.log('Submit!')
    },

    openResetFormDialog () {
      this.$refs.modal.openModal()
    },

    closeResetFormDialog () {
      this.$refs.modal.closeModal()
    },

    resetForm () {
      this.$refs.control.forEach(control => {
        control.resetControl()
      })

      this.activeStep = 0

      this.closeResetFormDialog()
    }
  }
}
</script>

<style lang="scss">
.l-Form {
  &__dialogFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;

    .u-Button:not(:first-child) {
      margin-left: 12px;
    }
  }
}
</style>
