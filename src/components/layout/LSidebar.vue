<template>
  
  <aside class="l-Sidebar">

    <slot/>

  </aside>

</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="scss">
.l-Sidebar {
  width: 20%;
  min-width: 210px;
  max-width: 300px;
  height: calc(100vh - 75px);
  padding: 35px 25px;
  background-color: $color-gray-lighter;
  background-image: url(../../assets/images/side-background.png);
  border-right: 1px solid $color-gray-light;
}
</style>
