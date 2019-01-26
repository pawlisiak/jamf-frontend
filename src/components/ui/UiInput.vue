<template>
  
  <input
    ref="input"
    v-model="controlValue"
  >

</template>

<script>
export default {
  name: "Input",

  props: {
    value: {
      type: [String, Number]
    }
  },

  computed: {
    controlValue: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit(
          'input',
          value
        )
      }
    }
  }
}
</script>
