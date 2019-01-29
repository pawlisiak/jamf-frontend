<template>

  <div class="u-FileModal">

    <div
      v-if="mimeTypeIsImage"
      :style="{ 'background-image': 'url(' + value + ')' }"
      class="u-FileModal__preview"
      :class="{ 'no-image': !fileIsUploaded }"
    ></div>

    <ui-button
      v-if="!controlIsDisabled"
      :callback="openModal"
    >

      <template v-if="!fileIsUploaded">

        Upload File

      </template>
      <template v-else>

        Change File

      </template>

    </ui-button>

    <!-- File upload modal: start -->

      <l-modal
        v-if="!controlIsDisabled"
        ref="modal"
        :heading="control.label"
      >

        <template slot="content">

          <p v-html="control.description"></p>

          <ui-file
            v-model="controlValue"
            ref="file"
            :autoEmit="false"
            :accept="control.mimetypes"
            class="u-FileModal__fileInput"
          />

        </template>

        <template slot="footer">

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

        </template>

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

    controlIsDisabled () {
      return this.control.disabled
    },

    fileIsUploaded () {
      return this.controlValue && this.controlValue.length > 0
    },

    mimeTypeIsSet () {
      return 'mimetypes' in this.control && typeof this.control.mimetypes === 'object' && this.control.mimetypes.length > 0
    },

    mimeTypeIsImage () {
      if (!this.mimeTypeIsSet) {
        return false
      }

      let response = true

      this.control.mimetypes.forEach(type => {
        if (type.split('/')[0] !== 'image') {
          response = false
        }
      })

      return response
    }
  },

  methods: {
    openModal () {
      if (this.controlIsDisabled) {
        return false
      }

      this.$refs.modal.openModal()
    },

    closeModal () {
      this.$refs.modal.closeModal()
    },

    uploadFile () {
      if (this.controlIsDisabled) {
        return false
      }

      this.controlValue = this.$refs.file.controlValue
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
.u-FileModal {
  &__preview {
    width: 80px;
    height: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-size: cover;
    background-position: center;

    &.no-image {
      border: 1px dashed $color-gray;
      border-radius: 3px;
    }
  }

  &__fileInput {
    margin-top: 20px;
  }
}
</style>
