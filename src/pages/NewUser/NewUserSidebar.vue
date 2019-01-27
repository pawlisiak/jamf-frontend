<template>

  <l-sidebar>

    <ol
      v-if="stepsFetched"
    >

      <li
        v-for="(step, index) in steps"
        :key="index"
        :class="{ 'is-active': stepIsActive(index) }"
      >
        {{ step }}
      </li>

    </ol>

  </l-sidebar>

</template>

<script>
export default {
  name: 'NewUser_Sidebar',

  props: {
    steps: {
      type: Array,
      required: true
    },

    activeStep: {
      type: Number,
      required: true
    }
  },

  computed: {
    stepsFetched: (_self = this) => {
      return _self.steps.length > 0
    }
  },

  methods: {
    stepIsActive (step) {
      return this.activeStep === step
    }
  }
}
</script>
