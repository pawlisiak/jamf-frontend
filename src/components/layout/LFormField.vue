<template>

  <div class="l-FormField">

    <label
      :class="{ 'is-invalid': !controlIsValid,
                'is-disabled': controlIsDisabled }"
    >

      <strong v-if="control.label || control.description">

        {{ control.label }}

        <em
          v-if="control.description"
          v-html="control.description"
        ></em>

      </strong>

      <ui-input
        v-if="controlIsInput"
        v-model="controlValue"
        :control="control"
        @blur="touchControl"
      />

      <ui-select
        v-if="controlIsSelect"
        v-model="controlValue"
        :control="control"
        @change="touchControl"
      />

      <ui-file-modal
        v-if="controlIsFileModal"
        v-model="controlValue"
        :control="control"
      />

      <em
        v-if="!controlIsValid"
        class="l-FormField__validationTip"
      >

        <span
          v-for="(tip, index) in validationTip"
          :key="index"
        >

          {{ tip }}

        </span>

      </em>

    </label>

  </div>

</template>

<script>
export default {
  name: 'Form_Field',

  props: {
    control: {
      type: Object,
      required: true,

      validator: (value) => {
        if (!('name' in value && 'type' in value)) {
          return false
        }

        if (['text', 'email', 'password', 'fileModal', 'file', 'select'].indexOf(value.type) < 0) {
          return false
        }

        if (value.type === 'select' && !('options' in value)) {
          return false
        }

        return true
      }
    },

    value: {
      type: [String, Number]
    }
  },

  data () {
    return {
      controlIsValid: true,
      controlIsTouched: false,
      validationTip: []
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

    controlIsInput () {
      return (['text', 'email', 'password'].indexOf(this.control.type) > -1)
    },

    controlIsSelect () {
      return this.control.type === 'select'
    },

    controlIsFile () {
      return this.control.type === 'file'
    },

    controlIsFileModal () {
      return this.control.type === 'fileModal'
    },

    controlIsDisabled () {
      return 'disabled' in this.control && this.control.disabled
    },

    controlHasCallback () {
      return 'callback' in this.control && typeof this.control.callback === 'function'
    }
  },

  watch: {
    controlValue (val) {
      this.validateControl(val)

      if (this.controlValue && this.controlIsValid && this.controlHasCallback) {
        this.control.callback(val)
      }
    }
  },

  methods: {
    touchControl () {
      this.controlIsTouched = true
      this.validateControl(this.controlValue)
    },

    resetControl () {
      this.controlValue = null
      this.controlIsTouched = false
      this.resetValidationStatus()
    },

    setValidationTip (message) {
      this.controlIsValid = false
      this.validationTip[this.validationTip.length] = message
    },

    resetValidationStatus () {
      this.controlIsValid = true
      this.validationTip.length = 0
    },

    validateControl (value) {
      // Prevent validation during input before first blur of input
      if (!this.controlIsTouched) {
        return
      }

      this.resetValidationStatus()

      // Find if required field is non-empty
      if (this.control.required && (!value || value.length === 0)) {
        this.setValidationTip('The field is required.')
        return
      }

      // Find if length reach minlength parameter
      if (this.control.minlength && value.trim().length < this.control.minlength) {
        this.setValidationTip('The field value should be at least ' + this.control.minlength + ' characters long.')
      }

      // Find if length is lower than maxlength parameter
      if (this.control.maxlength && value.trim().length > this.control.maxlength) {
        this.setValidationTip('The field value can\'t be longer than ' + this.control.maxlength + ' characters long.')
      }

      // Find if there is custom validator
      if ('validator' in this.control && typeof this.control.validator === 'function') {
        // Find if custom validator gives positive result
        if (!this.control.validator(value)) {
          let message = this.control.validationMessage || 'The field is invalid.'
          this.setValidationTip(message)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.l-FormField {
  margin-bottom: 24px;

  label {
    font-size: $font-size-base;

    > strong {
      display: block;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: $color-brand-secondary;

      > em {
        text-transform: none;
        font-weight: normal;
        font-style: normal;
        letter-spacing: 0;
        color: $color-gray-dark;
      }
    }

    &.is-invalid {
      color: red;

      > strong {
        color: inherit;

        > em {
          color: inherit;
        }
      }
    }

    &.is-disabled {
      color: $color-gray-dark;

      > strong {
        font-size: $font-size-small;
        color: inherit;

        > em {
          color: inherit;
        }
      }
    }
  }

  &__validationTip {
    display: block;
    margin-top: 8px;
    font-style: normal;

    > span {
      display: block;
    }
  }
}
</style>
