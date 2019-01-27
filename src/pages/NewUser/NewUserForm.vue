<template>

  <main>

    <l-form
      ref="form"
      :model="model"
    />

  </main>

</template>

<script>
export default {
  name: 'NewUser_Form',

  props: {
    model: {
      type: Array,
      required: true
    }
  }
}
</script>
