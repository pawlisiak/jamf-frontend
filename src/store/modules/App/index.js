export default {
  namespaced: true,

  state: {
    currentPage: 'Add new User Profile'
  },

  getters: {
    currentPageTitle: (state) => state.currentPage
  }
}
