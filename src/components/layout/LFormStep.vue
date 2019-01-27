<template>

  <div class="l-FormStep">

    <div class="l-FormStep__wrapper">

      <slot/>

    </div>

    <div class="l-FormStep__footer">

      <ui-button
        :callback="() => { return }"
      >
        Cancel
      </ui-button>

      <ui-button
        :callback="gotoNextStep"
        priority="primary"
      >
        Next
      </ui-button>

    </div>

  </div>

</template>

<script>
export default {
  name: 'FormStep',

  props: {
    index: {
      type: Number,
      required: true
    }
  },

  methods: {
    gotoNextStep () {
      this.$emit(
        'stepChange',
        this.index + 1
      )
    }
  }
}
</script>

<style lang="scss">
.l-FormStep {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  &__wrapper {
    flex-grow: 1;
  }

  &__footer {
    flex-grow: 0;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    .u-Button {
      margin-left: 12px;
    }
  }
}
</style>
