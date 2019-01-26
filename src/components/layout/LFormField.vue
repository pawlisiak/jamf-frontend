<template>
  
  <div class="l-FormField">

    <label>
    
      <strong v-if="control.label || control.description">

        {{ control.label }}

        <em
          v-if="control.description"
          v-html="control.description"
        ></em>

      </strong>

      <ui-input
        v-model="controlValue"
      />

    </label>

  </div>

</template>

<script>
export default {
  name: 'FormField',

  props: {
    control: {
      type: Object,
      required: true,

      validator: (value) => {
        if (! ('name' in value && 'type' in value))
          return false

        if (['text', 'email', 'password', 'fileModal', 'file', 'select'].indexOf(value.type) < 0)
          return false
        
        if (value.type === 'select' && ! ('options' in value))
          return false

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
    }
  }
}
</script>

<style lang="scss">
.l-FormField {
  label {
    > strong {
      display: block;
      text-transform: uppercase;

      > em {
        text-transform: none;
        font-weight: normal;
      }
    }
  }
}
</style>

