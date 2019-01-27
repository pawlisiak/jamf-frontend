<template>

  <div class="u-Select">

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

    <div class="u-Select__handler"></div>
  </div>

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
      type: [String, Number],
      default: '-'
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

<style lang="scss">
.u-Select {
  position: relative;

  &__handler {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid $color-gray-dark;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
}
</style>
