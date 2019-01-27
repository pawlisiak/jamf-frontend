<template>

  <select
    v-model="controlValue"
    @change="touchControl"
  >

    <option value="-">None</option>

    <option
      v-for="(option) in control.options"
      :key="option.id"
      :value="option.value"
    >
      {{ option.label }}
    </option>

  </select>

</template>

<script>
export default {
  name: 'Select',

  props: {
    control: {
      type: Object,
      require: true
    },

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
  },

  methods: {
    touchControl () {
      this.$emit('change')
    }
  },
}
</script>
