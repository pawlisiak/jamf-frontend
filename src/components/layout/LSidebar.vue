<template>

  <aside class="l-Sidebar">

    <slot/>

  </aside>

</template>

<script>
import '@/assets/images/side-background.png'

export default {
  name: 'Sidebar'
}
</script>

<style lang="scss">
.l-Sidebar {
  padding: 35px 25px;
  background-color: $color-gray-lighter;
  background-image: url(../../assets/images/side-background.png);

  @include breakpoint (lg) {
    width: 20%;
    min-width: 210px;
    max-width: 300px;
    height: calc(100vh - 75px);
    border-right: 1px solid $color-gray-light;
  }

  @include breakpoint (sm down) {
    align-self: flex-start;
    width: 100%;
    border-bottom: 1px solid $color-gray-light;

    @media (max-height: 700px) {
      padding: 25px;
    }
  }
}
</style>
