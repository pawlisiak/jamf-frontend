<template>

  <label class="u-File">

    <input
      @change="changeHandler"
      ref="input"
      type="file"
      :accept="accept"
    >

    <ui-button
      :callback="chooseFile"
      size="small"
    >
      Choose file
    </ui-button>

    <span
      class="u-File__caption"
    >
      {{ fileName }}
    </span>

  </label>

</template>

<script>
export default {
  name: 'File',

  props: {
    autoEmit: {
      type: Boolean,
      required: false,
      default: true
    },

    accept: {
      type: Array,
      required: false
    }
  },

  data () {
    return {
      controlValue: null,
      fileName: 'No file chosen'
    }
  },

  methods: {
    chooseFile () {
      this.$refs.input.click()
    },

    changeHandler () {
      this.setValue()
      this.setFileName()
    },

    setFileName () {
      if (this.$refs.input.files && this.$refs.input.files[0]) {
        this.fileName = this.$refs.input.files[0].name
        return
      }

      this.fileName = 'No file chosen'
    },

    setValue () {
      if (this.$refs.input.files && this.$refs.input.files[0]) {
        let fileReader = new FileReader()

        fileReader.onload = (e) => {
          this.controlValue = e.target.result
        }

        fileReader.readAsDataURL(this.$refs.input.files[0])
      }
    }
  },

  watch: {
    controlValue (val) {
      if (!this.autoEmit) {
        return
      }

      this.$emit(
        'input',
        this.controlValue
      )
    }
  }
}
</script>

<style lang="scss">
.u-File {
  input[type="file"] {
    display: none;
  }

  &__caption {
    margin-left: 15px;
  }
}
</style>
