<template>

  <div class="App">

    <l-header/>

    <div class="App__wrapper">

      <new-user/>

    </div>

  </div>

</template>

<script>
import NewUser from './components/pages/NewUser'

export default {
  name: 'app',

  components: {
    NewUser
  }
}
</script>

<style lang="scss">
.App {
  &__wrapper {
    margin-top: 75px;
  }
}
</style>
