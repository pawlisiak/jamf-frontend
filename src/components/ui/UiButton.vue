<template>

  <button
    @click.prevent="callback"
    class="u-Button"
    :class="{ 'u-Button--primary': priority === 'primary',
              'u-Button--secondary': priority === 'secondary',
              'u-Button--small': size === 'small' }"
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
    },

    size: {
      type: String,
      default: 'medium',

      validator: (value) => {
        return ['small', 'medium', 'large'].indexOf(value) > -1
      }
    }
  }
}
</script>

<style lang="scss">
.u-Button {
  @include verticalGradient ($color-gradient-gray-light-from, $color-gradient-gray-light-to);

  padding: 10px 19px 12px;
  font-size: $font-size-base;
  line-height: 1em;
  white-space: nowrap;
  border: 1px solid $color-gray;
  border-radius: 18px;
  box-shadow: inset 0 10px 20px rgba(black, 0);
  cursor: pointer;
  transition: box-shadow .35s;

  &:hover,
  &:focus {
    box-shadow: inset 0 10px 20px rgba(black, .2);
  }

  &:focus {
    outline: none;
  }

  // Priorities

  &--primary,
  &--secondary {
    color: white;
    border-color: $color-brand-accent;
  }

  &--primary {
    background: $color-brand-accent;
  }

  &--secondary {
    @include verticalGradient ($color-gradient-blue-from, $color-gradient-blue-to);
  }

  // Sizes

  &--small {
    padding: 6px 14px 7px;
  }
}
</style>
