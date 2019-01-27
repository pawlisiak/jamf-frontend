<template>

  <button
    @click.prevent="callback"
    class="u-Button"
    :class="{ 'u-Button--primary': priority === 'primary',
              'u-Button--secondary': priority === 'secondary' }"
  >

    <slot/>

  </button>

</template>

<script>
export default {
  name: 'Button',

  props: {
    callback: {
      type: Function,
      required: true
    },

    priority: {
      type: String,
      default: 'default',

      validator: (value) => {
        return ['primary', 'secondary', 'default'].indexOf(value) > -1
      }
    }
  }
}
</script>

<style lang="scss">
.u-Button {
  height: 35px;
  padding: 10px 19px 12px;
  font-size: $font-size-base;
  line-height: 1em;
  white-space: nowrap;
  background-color: $color-gradient-gray-light-to;
  border: 1px solid $color-gray;
  border-radius: 18px;
  cursor: pointer;

  &--primary,
  &--secondary {
    color: white;
    border-color: $color-brand-accent;
  }

  &--primary {
    background-color: $color-brand-accent;
  }

  &--secondary {
    background-color: $color-gradient-blue-to;
  }
}
</style>
