<template>

  <div class="l-FormField">

    <label
      :class="{ 'is-invalid': !controlIsValid }"
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
        @input="validateControl"
      />

      <ui-select
        v-if="controlIsSelect"
        v-model="controlValue"
        :control="control"
        @blur="touchControl"
        @change="validateControl"
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
  name: 'FormField',

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
    }
  },

  methods: {
    touchControl () {
      this.controlIsTouched = true
      this.validateControl()
    },

    setValidationTip (message) {
      this.controlIsValid = false
      this.validationTip[this.validationTip.length] = message
    },

    resetValidationStatus () {
      this.controlIsValid = true
      this.validationTip.length = 0
    },

    validateControl () {
      // Prevent validation during input before first blur of input
      if (!this.controlIsTouched) {
        return
      }

      this.resetValidationStatus()

      // Find if required field is non-empty
      if (this.control.required && (!this.controlValue || this.controlValue.trim().length === 0)) {
        this.setValidationTip('The field is required.')
        return
      }

      // Find if length reach minlength parameter
      if (this.control.minlength && this.controlValue.trim().length < this.control.minlength) {
        this.setValidationTip('The field value should be at least ' + this.control.minlength + ' characters long.')
      }

      // Find if length is lower than maxlength parameter
      if (this.control.maxlength && this.controlValue.trim().length > this.control.maxlength) {
        this.setValidationTip('The field value can\'t be longer than ' + this.control.maxlength + ' characters long.')
      }

      // Find if there is custom validator
      if ('validator' in this.control && typeof this.control.validator === 'function') {
        // Find if custom validator gives positive result
        if (!this.control.validator(this.controlValue)) {
          this.setValidationTip('Something wrong')
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
    font-size: $font-size-small;

    &.is-invalid {
      color: red;
    }

    > strong {
      display: block;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: .1em;

      > em {
        text-transform: none;
        font-weight: normal;
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
