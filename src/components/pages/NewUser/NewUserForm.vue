<template>

  <main>

    <l-form
      ref="form"
      @stepChange="stepChange"
      :model="model"
    />

  </main>

</template>

<script>
export default {
  name: 'NewUser_Form',

  props: {
    model: {
      type: Array,
      required: true
    }
  },

  methods: {
    stepChange (payload) {
      this.$emit(
        'stepChange',
        payload
      )
    }
  }
}
</script>
