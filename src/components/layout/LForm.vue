<template>

  <form class="l-Form">

    <l-form-step
      v-for="(step, index) in model"
      :key="index"
      v-show="stepIsActive(index)"
      @stepChange="stepChange"
      @submitForm="submitForm"
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
        :control="control"
      />

      <div
        v-if="step.outro"
        v-html="step.outro"
      ></div>

    </l-form-step>

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

  methods: {
    stepIsActive (step) {
      return step === this.activeStep
    },

    stepChange (payload) {
      this.activeStep = payload
    },

    submitForm () {
      console.log('Submit!')
    }
  }
}
</script>
