<template>

  <l-sidebar>

    <ol
      v-if="areStepsFetched"
    >

      <li
        v-for="(step, index) in steps"
        :key="index"
        :class="{ 'is-active': isStepActive(index) }"
      >
        {{ step }}
      </li>

    </ol>

    <figure>
      <img src="http://pawlisiak.com/img/app-icon.png">
    </figure>

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
    areStepsFetched: (_self = this) => {
      return _self.steps.length > 0
    }
  },

  methods: {
    isStepActive (step) {
      return this.activeStep === step
    }
  }
}
</script>
