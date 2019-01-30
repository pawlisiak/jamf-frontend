<template>

  <form
    :class="{ 'is-processing': isFormProcessing }"
    class="l-Form"
  >

    <l-form-step
      v-for="(step, index) in model"
      :key="index"
      v-show="isStepActive(index)"
      @stepChange="stepChange"
      @submitForm="submitForm"
      @resetForm="openResetFormDialog"
      :index="index"
      :count="model.length"
    >

      <div
        v-if="step.intro"
        v-html="step.intro"
        class="l-Form__stepIntro"
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
        class="l-Form__stepOutro"
      ></div>

    </l-form-step>

    <!-- Reset form dialog: start -->

      <l-modal
        ref="modal"
        heading="Are you sure?"
      >

        <template slot="content">

          <p>Are you sure you want to reset the form?<br>Click 'Ok' to erase all the form data!</p>

        </template>
        <template slot="footer">

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

        </template>

      </l-modal>

    <!-- Reset form dialog: end -->

  </form>

</template>

<script>
import service from '@/services/SubmitForm'

import { mapActions } from 'vuex'

export default {
  name: 'Form',

  props: {
    model: {
      type: Array,
      required: true
    },

    action: {
      type: String
    }
  },

  data () {
    return {
      activeStep: 0,
      isFormProcessing: false,

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
    ...mapActions('App', {
      commitNotification: 'commitNotification'
    }),

    isStepActive (step) {
      return step === this.activeStep
    },

    stepChange (payload) {
      this.activeStep = payload
    },

    getFormValidation () {
      let isFormValid = true

      this.$refs.control.forEach(control => {
        if ('touchControl' in control) {
          control.touchControl()

          if (!control.isControlValid) {
            isFormValid = false
          }
        }
      })

      return isFormValid
    },

    submitForm () {
      this.isFormProcessing = true

      if (this.getFormValidation()) {
        this.sendForm()
      } else {
        this.commitNotification(
          'Something\'s wrong with the form. Reset form and try again.'
        )

        this.isFormProcessing = false
      }
    },

    async sendForm () {
      try {
        let response = await service.submitForm(this.action, this.values)

        console.log(response)

        this.resetForm()

        this.isFormProcessing = false
      } catch (error) {
        this.commitNotification(
          error + ' (when submitting the form)'
        )

        this.isFormProcessing = false
      }
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
  position: relative;

    &::after {
      content: '';
      top: 10px;
      left: 10px;
      width: calc(100% - 20px);
      height: 0;
      opacity: 0;
      transition: opacity .3s,
                  height 0s linear .3s;
    }

  &.is-processing {
    &::after {
      height: calc(100% - 20px);
      background-color: rgba(white, .7);
      opacity: 1;
      transition: opacity .3s;
    }
  }

  &__stepIntro {
    margin-bottom: 20px;
  }

  &__stepOutro {
    margin-top: 20px;
  }
}
</style>
