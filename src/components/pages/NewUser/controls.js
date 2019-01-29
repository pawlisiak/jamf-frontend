import validator from '@/methods/validators'

export function model (_self) {
  return [
    {
      title: 'Add login details',
      controls: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,

          validator: (value) => validator.emailFormat(value),
          validationMessage: 'Wrong format of email address.',

          callback: (value) => {
            _self.$refs.form.$refs.form.values.emailVerification = value
          }
        },

        {
          name: 'password',
          label: 'Password',
          type: 'password',
          required: true,
          minlength: 6,
          maxlength: 32
        },

        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          required: true,
          maxlength: 32,

          validator: (value) => {
            return value === _self.$refs.form.$refs.form.values.password
          },

          validationMessage: 'Password and confirmation don\'t match.'
        }
      ]
    },

    {
      title: 'Select the user group',
      intro: '<h2>Choose the User Group</h2>',
      controls: [
        {
          name: 'userGroup',
          label: 'User Group',
          description: 'User Group to add the users to',
          type: 'select',
          required: true,
          options: _self.userGroups,

          callback: (value) => {
            let groupObject = _self.userGroups.filter(group => {
              if (group.id === value) {
                return group
              }
            })

            let groupName = groupObject[0].label

            _self.$refs.form.$refs.form.values.userGroupVerification = groupName
          }
        }
      ]
    },

    {
      title: 'Add an avatar',
      controls: [
        {
          name: 'avatar',
          label: 'Avatar',
          description: 'User Avatar. It is recommended that you use a file with the GIF or PNG format. The recommended size is 512x512 pixels.',
          type: 'fileModal',
          required: true,

          mimetypes: [
            'image/gif',
            'image/png',
            'image/jpeg'
          ],

          validator: (value) => validator.fileMimeType(value, ['image/gif', 'image/png', 'image/jpeg']),
          validationMessage: 'Wrong image file format',

          callback: (value) => {
            _self.$refs.form.$refs.form.values.avatarVerification = value
          }
        }
      ]
    },

    {
      title: 'Submit the form',
      controls: [
        {
          name: 'emailVerification',
          label: 'Email',
          type: 'text',
          disabled: true
        },

        {
          name: 'userGroupVerification',
          label: 'User Group',
          type: 'text',
          disabled: true
        },

        {
          name: 'avatarVerification',
          label: 'Avatar',
          type: 'fileModal',

          mimetypes: [
            'image/gif',
            'image/png',
            'image/jpeg'
          ],

          disabled: true
        }
      ]
    }
  ]
}
