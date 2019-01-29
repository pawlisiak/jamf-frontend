<template>

  <header class="l-Header">

    <figure>
      <img src="@/assets/images/icon.png">
    </figure>

    <h1>{{ pageTitle }}</h1>

  </header>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters('App', {
      pageTitle: 'getCurrentPageTitle'
    })
  }
}
</script>

<style lang="scss">
.l-Header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 980;
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  padding: 15px;
  background: white;
  border-bottom: 1px solid $color-gray-light;
  box-shadow: 0 1px 5px rgba(black, .1);

  figure {
    width: 32px;
    margin: 0 15px 0 0;
    line-height: 0;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  h1 {
    margin: 0;
  }
}
</style>
