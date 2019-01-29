import Axios from 'axios'

export default {
  async submitForm (uri, payload = null) {
    let response = await Axios.post(uri, payload)

    return response
  }
}
