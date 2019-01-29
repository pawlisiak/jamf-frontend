export default {
  storeNotification: (state, payload) => {
    state.notifications[state.notifications.length] = {
      message: payload,
      timestamp: new Date().getTime()
    }

    state.lastNotification = new Date().getTime()
  },

  removeNotification: (state, payload) => {
    if (payload in state.notifications) {
      state.notifications.splice(payload, 1)
    }

    state.lastNotification = new Date().getTime()
  }
}
