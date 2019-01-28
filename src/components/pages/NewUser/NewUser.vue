<template>

  <div class="p-NewUser">

    <new-user-sidebar
      :steps="steps"
      :activeStep="activeStep"
      class="p-NewUser__sidebar"
    />

    <new-user-form
      ref="form"
      @stepChange="stepChange"
      :model="formModel"
      class="p-NewUser__form"
    />

  </div>

</template>

<script>
import NewUserSidebar from './NewUserSidebar'
import NewUserForm from './NewUserForm'

import { mapActions, mapGetters } from 'vuex'
import { model } from './controls'

export default {
  name: 'NewUser',

  components: {
    NewUserSidebar,
    NewUserForm
  },

  data () {
    return {
      activeStep: 0
    }
  },

  computed: {
    ...mapGetters('NewUser', {
      userGroups: 'getUserGroups'
    }),

    formModel () {
      return model(this)
    },

    steps () {
      let reducedArray = []

      this.formModel.forEach((i) => {
        reducedArray[reducedArray.length] = i.title
      })

      return reducedArray
    }
  },

  methods: {
    ...mapActions('NewUser', {
      fetchUserGroupsData: 'fetchUserGroupsData'
    }),

    stepChange (payload) {
      this.activeStep = payload
    }
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
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;

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
          transition: background-color .3s;
        }

        &.is-active {
          &::before {
            background: #7dd96e;
          }
        }
      }
    }

    figure {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 120%;

      img {
        width: 100%;
        height: auto;
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
