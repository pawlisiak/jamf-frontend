<template>

  <div class="u-FileModal">

    <div
      v-if="imageIsValid"
      :style="{ 'background-image': 'url(' + value + ')' }"
      class="u-FileModal__preview"
    ></div>

    <ui-button :callback="openModal">
      Upload Avatar
    </ui-button>

    <!-- File upload modal: start -->

      <l-modal
        ref="modal"
        :heading="control.label"
      >

        <div v-html="control.description"></div>

        <ui-file
          v-model="controlValue"
          ref="file"
          :autoEmit="false"
        />

        <footer class="u-FileModal__dialogFooter">

          <ui-button
            :callback="closeModal"
          >
            Cancel
          </ui-button>

          <ui-button
            priority="primary"
            :callback="uploadFile"
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
    },

    value: {
      type: [String, Number]
    }
  },

  data () {
    return {
      modalIsOpened: true
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

    imageIsValid () {
      return true
    }
  },

  methods: {
    openModal () {
      this.$refs.modal.openModal()
    },

    closeModal () {
      this.$refs.modal.closeModal()
    },

    uploadFile () {
      this.controlValue = this.$refs.file.controlValue
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
.u-FileModal {
  &__preview {
    width: 100px;
    height: 100px;
    background-size: cover;
  }

  &__dialogFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }
}
</style>
