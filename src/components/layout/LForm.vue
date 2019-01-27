<template>

  <form class="l-Form">

    <l-form-step
      v-for="(step, index) in model"
      :key="index"
      :index="index"
      v-show="stepIsActive(index)"
      @stepChange="stepChange"
    >

      <template
        v-if="step.intro"
        v-html="step.intro"
      ></template>

      <l-form-field
        v-for="control in step.controls"
        :key="control.name"
        v-model="values[control.name]"
        :control="control"
      />

      <template
        v-if="step.outro"
        v-html="step.outro"
      ></template>

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
    }
  }
}
</script>
