export default {
  commitNotification: ({ commit }, payload) => {
    if (payload) {
      commit(
        'storeNotification',
        payload
      )
    }
  },

  setNotificationWatched: ({ commit }, payload) => {
    commit(
      'removeNotification',
      payload
    )
  }
}
