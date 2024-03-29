export default {
  // Email address validation

  emailFormat: (value) => {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(value)
  },

  // File mimetype validation
  // Validator is very simple, sory. Don't blame me for this.

  fileMimeType: (value, mimetypes = []) => {
    if (mimetypes.length === 0) {
      return true
    }

    if (typeof mimetypes !== 'object') {
      console.warn('"mimetypes" node have to be an array')
      return true
    }

    let result = false

    mimetypes.forEach(function (type) {
      if (value.indexOf('data:' + type + ';base64,') === 0) {
        result = true
      }
    })

    return result
  }
}
