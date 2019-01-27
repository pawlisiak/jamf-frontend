<template>

  <div class="p-NewUser">

    <new-user-sidebar
      :steps="steps"
      :activeStep="activeStep"
      class="p-NewUser__sidebar"
    />

    <new-user-form
      :model="formModel"
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
              required: true
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
              name: 'verifyPassword',
              label: 'Verify Password',
              type: 'password',
              required: true,
              minlength: 6,
              maxlength: 32
            }
          ]
        },
        {
          title: 'Select the user group',
          intro: '<h1>Choose the User Group</h2>',
          controls: [
            {
              name: 'userGroup',
              label: 'User Group',
              description: 'User Group to add the users to',
              type: 'select',
              required: true,
              options: this.userGroups
            }
          ]
        },
        {
          title: 'Add an avatar',
          constrols: [
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
