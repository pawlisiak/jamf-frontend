import service from '@/services/UserGroups'

export default {
  fetchCachedData ({ commit }) {
    let lastSessionDate = new Date(localStorage.getItem('jamf_lastSessionDate'))
    let currentDate = new Date()

    let cachedFormData = []

    if ((currentDate - lastSessionDate) / 60000 < 15) {
      cachedFormData = localStorage.getItem('jamf_newPersonData')
    } else {
      localStorage.removeItem('jamf_newPersonData')
    }

    commit(
      'setFormData',
      cachedFormData
    )
  },

  async 'fetchUserGroupsData' ({ commit }) {
    try {
      let groups = await service.fetchUserGroupsData()

      commit(
        'setUserGroupsData',
        groups
      )
    } catch (error) {
      console.log(error)
    }
  },

  updateSession () {
    localStorage.setItem('jamf_lastSessionDate', new Date())
  }
}
