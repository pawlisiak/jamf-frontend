import config from '@/config'
import Axios from 'axios'

export default {
  async fetchUserGroupsData () {
    let response = await Axios.get(config.api.UserGroups)

    return response.data.reduce((groups, item) => {
      groups[groups.length] = {
        id: item.id,
        value: item.id,
        label: item.name
      }

      return groups
    }, [])
  }
}
