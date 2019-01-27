<template>

  <div class="p-NewUser">

    <new-user-sidebar
      :steps="steps"
      :activeStep="activeStep"
      class="p-NewUser__sidebar"
    />

    <new-user-form
      :model="formModel"
      ref="form"
      class="p-NewUser__form"
    />

  </div>

</template>

<script>
import NewUserSidebar from './NewUserSidebar'
import NewUserForm from './NewUserForm'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NewUser',

  components: {
    NewUserSidebar,
    NewUserForm
  },

  computed: {
    ...mapGetters('NewUser', {
      userGroups: 'getUserGroups'
    }),

    formModel () {
      return [
        {
          title: 'Add login details',
          controls: [
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              required: true,
              validator: (value) => {
                this.$refs.form.$refs.form.values.emailVerification = value
                
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return regex.test(value)
              },
              validationMessage: 'Wrong format of email address.'
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
                return value === this.$refs.form.$refs.form.values.password
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
              options: this.userGroups,
              validator: (value) => {
                if (value === '-') {
                  return false
                }

                let groupObject = this.userGroups.filter(group => {
                  if (group.id === value) {
                    return group
                  }
                })

                let groupName = groupObject[0].label
                this.$refs.form.$refs.form.values.userGroupVerification = groupName

                return true
              },
              validationMessage: 'You have to choose the User Group'
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
              required: false
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
            }
          ]
        }
      ]
    },

    steps () {
      let reducedArray = []

      this.formModel.forEach((i) => {
        reducedArray[reducedArray.length] = i.title
      })

      return reducedArray
    },

    activeStep: () => {
      return 0
    }
  },

  methods: {
    ...mapActions('NewUser', {
      fetchUserGroupsData: 'fetchUserGroupsData'
    })
  },

  mounted () {
    this.fetchUserGroupsData()
  }
}
</script>

<style lang="scss">
.p-NewUser {
  display: flex;
  align-items: stretch;

  &__sidebar {
    flex-grow: 0;
    flex-shrink: 0;

    ol {
      padding: 0;
      margin: 10x 0;
      list-style: none;

      > li {
        position: relative;
        padding-left: 28px;
        font-size: 15px;
        line-height: 1em;

        &:not(:last-of-type) {
          margin-bottom: 25px;
        }

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: .5em;
          transform: translateY(-50%);
          width: 9px;
          height: 9px;
          background: $color-gray-dark;
          border-radius: 50%;
        }

        &.is-active {
          &::before {
            background: #7dd96e;
          }
        }
      }
    }
  }

  &__form {
    flex-grow: 1;
    padding: 40px 25px 25px;

    .l-Form {
      height: 100%;
    }
  }
}
</style>
