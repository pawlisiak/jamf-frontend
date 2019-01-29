<template>

  <div
    class="l-Notifications"
  >

    <transition-group
      name="l-Notifications-"
      :duration="500"
    >

      <div
        v-for="(item, index) in notifications"
        :key="item.timestamp"
        :ref="'message-' + index"
        class="l-Notifications__message"
        @click="removeNotification(index)"
      >

        {{ item.message }}

      </div>

    </transition-group>

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Notifications',

  data () {
    return {
      notifications: []
    }
  },

  computed: {
    ...mapGetters('App', {
      lastNotification: 'getLastNotification'
    })
  },

  watch: {
    lastNotification (val) {
      this.$set(this, 'notifications', this.getNotifications())
      this.$forceUpdate()
    }
  },

  methods: {
    ...mapActions('App', {
      setNotificationWatched: 'setNotificationWatched'
    }),

    removeNotification (index) {
      let item = this.$refs['message-' + index][0]
      item.style.marginBottom = -item.clientHeight + 'px'

      this.setNotificationWatched(index)
    },

    getNotifications () {
      return this.$store.state.App.notifications
    }
  }
}
</script>

<style lang="scss">
.l-Notifications {
  $this: &;

  position: fixed;
  top: 20px;
  right: 15px;
  z-index: 998;

  &__message {
    width: calc(100vw - 30px);
    max-width: 300px;
    margin-bottom: 10px;
    padding: 15px 20px;
    color: white;
    text-shadow: 0 1px 2px rgba(black, .2);
    background: red;
    border-radius: 4px;
    transition: .3s;
  }

  /** Transitions **/

  &--enter,
  &--leave-to {
    opacity: 0;
  }

  &--enter {
    transform: translateY(-80px);
  }

  &--leave-to {
    transform: translateX(50%);
  }
}
</style>
