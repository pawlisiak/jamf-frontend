<template>
  
  <div class="l-FormField">

    <label>
    
      <strong v-if="control.label">
        {{ control.label }}
      </strong>

      <em v-if="control.description">
        {{ control.description }}
      </em>

      <ui-input/>

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
        if (! ('name' in value && 'type' in value))
          return false

        if (['text', 'email', 'password', 'fileModal', 'file', 'select'].indexOf(value.type) < 0)
          return false
        
        if (value.type === 'select' && ! ('options' in value))
          return false

        return true
      }
    }
  }
}
</script>

