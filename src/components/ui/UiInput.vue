<template>

  <input
    ref="input"
    v-model="controlValue"
    @blur="touchControl"
    :placeholder="placeholderText"
  >

</template>

<script>
export default {
  name: 'Input',

  props: {
    control: {
      type: Object,
      required: true,

      validator: (value) => {
        if (!('name' in value && 'type' in value)) {
          return false
        }

        if (['text', 'email', 'password'].indexOf(value.type) < 0) {
          return false
        }

        return true
      }
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
    },

    placeholderText () {
      if (this.control.required) {
        return 'Required'
      }

      return ''
    }
  },

  methods: {
    setInputType () {
      this.$refs.input.type = this.control.type
    },

    disableInput () {
      if (this.control.disabled) {
        this.$refs.input.disabled = true
      }
    },

    touchControl () {
      this.$emit('blur')
    }
  },

  mounted () {
    this.setInputType()
    this.disableInput()
  }
}
</script>
