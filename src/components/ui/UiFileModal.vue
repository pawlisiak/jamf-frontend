<template>

  <div class="u-FileModal">

    <div class="u-FileModal__preview"></div>

    <ui-button :callback="openModal">
      Upload Avatar
    </ui-button>

    <!-- File upload modal: start -->

      <l-modal
        ref="modal"
        :heading="control.label"
      >

        <div v-html="control.description"></div>

        <ui-file/>

        <footer class="u-FileModal__dialogFooter">

          <ui-button
            :callback="closeModal"
          >
            Cancel
          </ui-button>

          <ui-button
            priority="primary"
            :callback="() => {}"
          >
            Upload
          </ui-button>

        </footer>

      </l-modal>

    <!-- File upload modal: end -->

  </div>

</template>

<script>
export default {
  name: 'FileModal',

  props: {
    control: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      modalIsOpened: true
    }
  },

  methods: {
    openModal () {
      this.$refs.modal.openModal()
    },

    closeModal () {
      this.$refs.modal.closeModal()
    }
  }
}
</script>

<style lang="scss">
.u-FileModal {
  &__dialogFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }
}
</style>
