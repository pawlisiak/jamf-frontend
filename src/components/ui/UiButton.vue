<template>
  
  <button
    @click.prevent="callback"
    class="u-Button"
    :class="{ 'u-Button--primary': priority === 'primary' }"
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
        return ['primary', 'default'].indexOf(value) > -1
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

  &--primary {
    color: white;
    background-color: $color-gradient-blue-to;
    border-color: $color-brand-accent;
  }
}
</style>
