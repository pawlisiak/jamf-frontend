<template>
  
  <main>

    <l-form>

      <l-form-step
        v-for="(step, index) in model"
        :key="index"
        v-show="stepIsActive(index)"
      >

        <template
          v-if="step.intro"
          v-html="step.intro"
        ></template>

        <l-form-field
          v-for="control in step.controls"
          :key="control.name"
          v-model="values[control.name]"
          ref="control"
          :control="control"
        />

        <template
          v-if="step.outro"
          v-html="step.outro"
        ></template>

      </l-form-step>

    </l-form>

  </main>

</template>

<script>
export default {
  name: 'NewUser_Form',

  props: {
    model: {
      type: Array,
      required: true
    },

    activeStep: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      values: {}
    }
  },

  methods: {
    stepIsActive (step) {
      return this.activeStep === step
    }
  }
}
</script>

