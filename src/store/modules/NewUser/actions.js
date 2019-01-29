import service from '@/services/UserGroups'

export default {
  async 'fetchUserGroupsData' ({ commit, dispatch }) {
    try {
      let groups = await service.fetchUserGroupsData()

      commit(
        'setUserGroupsData',
        groups
      )
    } catch (error) {
      dispatch(
        'App/commitNotification',
        error.message + ' (mock.json)',
        { root: true }
      )
    }
  }
}
