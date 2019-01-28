<template>

  <transition
    name="l-Modal-"
    :duration="500"
    mode="in-out"
  >

    <div
      v-if="modalIsOpened"
      class="l-Modal"
    >

      <div
        @click.prevent="closeModal"
        class="l-Modal__overlay"
      ></div>

      <div class="l-Modal__window">

        <div
          v-if="heading"
          class="l-Modal__heading"
        >

          <h1>
            {{ heading }}
          </h1>

        </div>

        <div class="l-Modal__content">

          <slot/>

        </div>

      </div>

    </div>

  </transition>

</template>

<script>
export default {
  name: 'Modal',

  props: {
    heading: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      modalIsOpened: false
    }
  },

  methods: {
    closeModal () {
      this.modalIsOpened = false
    },

    openModal () {
      this.modalIsOpened = true
    }
  }
}
</script>

<style lang="scss">
.l-Modal {
  $this: &;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__overlay {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(black, .7);
  }

  &__window {
    width: 100%;
    max-width: 600px;
    margin: 20px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 7px 20px rgba(black, .2);
  }

  &__heading {
    border-bottom: 1px solid $color-gray-light;
    box-shadow: 0 1px 5px rgba(black, .1);

    h1 {
      margin: 0;
    }
  }

  &__heading,
  &__content {
    padding: 25px;
  }

  // Enter and leave animation
  &--enter,
  &--leave-to {
    #{$this} {
      &__overlay,
      &__window {
        opacity: 0;
      }

      &__window {
        transform: translateY(100px);
      }
    }
  }

  &--enter-to,
  &--leave {
    #{$this} {
      &__overlay,
      &__window {
        opacity: 1;
      }

      &__window {
        transform: translateY(0);
      }
    }
  }

  &--enter-active {
    #{$this} {
      &__overlay,
      &__window {
        transition: .5s;
      }
    }
  }

  &--leave-active {
    #{$this} {
      &__overlay,
      &__window {
        transition: .2s;
      }
    }
  }
}
</style>
