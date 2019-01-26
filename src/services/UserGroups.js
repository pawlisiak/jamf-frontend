import config from '@/config'
import Axios from 'axios'

export default {
  async fetchUserGroupsData () {
    let response = await Axios.get(config.api.UserGroups)

    return response
  }
}
